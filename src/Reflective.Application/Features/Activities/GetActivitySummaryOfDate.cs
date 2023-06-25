using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities.GetActivitySummaryOfDate
{
    public class GetActivitySummaryOfDateHandler : IRequestHandler<GetActivitySummaryOfDateRequest, List<SummaryActivityDto>>
    {
        private readonly IActivityRepository _ar;

        public GetActivitySummaryOfDateHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task<List<SummaryActivityDto>> Handle(GetActivitySummaryOfDateRequest request, CancellationToken cancellationToken)
        {
            List<Activity> trackedActivities = await _ar.GetActivitiesTrackedOnDateAsync(request.date, cancellationToken);

            List<SummaryActivityDto> activities = new();

            foreach(Activity activity in trackedActivities)
            {
                SummaryActivityDto activityDto = new(
                    id: activity.Id,
                    name: activity.Name,
                    sessions: new(),
                    plans: new()
                );

                activities.Add(activityDto);

                foreach(ActivitySession session in activity.Sessions)
                {
                    bool sessionStartedAfterEndOfDay = session.Start > request.date.ToDateTime(TimeOnly.MaxValue);
                    if(sessionStartedAfterEndOfDay)
                        continue;

                    bool sessionEndedBeforeDayStarted = session.End < request.date.ToDateTime(TimeOnly.MinValue) || session.End == null;
                    if(sessionEndedBeforeDayStarted)
                        continue;

                    ActivitySessionDto sessionDto = new(
                        id: session.Id,
                        start: TimeOnly.FromDateTime(session.Start),
                        startedOnPrevDay: session.Start < request.date.ToDateTime(TimeOnly.MinValue),
                        end: session.End == null ? null : TimeOnly.FromDateTime((DateTime)session.End),
                        endedOnNextDay: session.End > request.date.ToDateTime(TimeOnly.MaxValue)
                    );

                    activityDto.sessions.Add(sessionDto);
                }

                foreach(ActivityPlan activityPlan in activity.ActivityPlans)
                    foreach (ActivityPlanVersion activityPlanVersion in activityPlan.Versions)
                    {
                        bool versionStartsAfterDate = activityPlanVersion.StartDate > request.date;
                        if(versionStartsAfterDate)
                            continue;

                        bool versionEndsBeforeDate = activityPlanVersion.EndDate != null && activityPlanVersion.EndDate < request.date;
                        if(versionEndsBeforeDate)
                            continue;

                        bool activityPlanVersionContainsDayOfWeek = activityPlanVersion.DaysOfWeek.Contains(request.date.DayOfWeek);
                        if(activityPlanVersionContainsDayOfWeek)
                        {
                            ActivityPlanVersionDto activityPlanVersionDto = new(
                                id: activityPlanVersion.Id,
                                start: activityPlanVersion.StartTime,
                                startsOnPrevDay: false,
                                end: activityPlanVersion.EndTime,
                                endsOnNextDay: activityPlanVersion.EndTime < activityPlanVersion.StartTime
                            );

                            activityDto.plans.Add(activityPlanVersionDto);
                        }

                        DayOfWeek prevDayOfWeek = request.date.AddDays(-1).DayOfWeek;
                        bool activityPlanVersionContainsPrevDayOfWeek = activityPlanVersion.DaysOfWeek.Contains(request.date.AddDays(-1).DayOfWeek);
                        bool activityPlanVersionSpansAcrossMultipleDays = activityPlanVersion.EndTime < activityPlanVersion.StartTime;
                        if(activityPlanVersionContainsPrevDayOfWeek && activityPlanVersionSpansAcrossMultipleDays)
                        {
                            ActivityPlanVersionDto activityPlanVersionDto = new(
                                id: activityPlanVersion.Id,
                                start: activityPlanVersion.StartTime,
                                startsOnPrevDay: true,
                                end: activityPlanVersion.EndTime,
                                endsOnNextDay: false
                            );

                            activityDto.plans.Add(activityPlanVersionDto);
                        }
                    }
            }

            return activities;
        }
    }

    public record GetActivitySummaryOfDateRequest(DateOnly date) : IRequest<List<SummaryActivityDto>>;

    public record SummaryActivityDto(Guid id, string name, List<ActivitySessionDto> sessions, List<ActivityPlanVersionDto> plans);

    public record ActivitySessionDto(Guid id, TimeOnly start, bool startedOnPrevDay, TimeOnly? end, bool endedOnNextDay);

    public record ActivityPlanVersionDto(Guid id, TimeOnly start, bool startsOnPrevDay, TimeOnly end, bool endsOnNextDay);
}