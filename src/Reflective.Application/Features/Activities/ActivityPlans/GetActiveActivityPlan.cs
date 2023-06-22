using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities.ActivityPlans
{
    public class GetActiveActivityPlanHandler : IRequestHandler<GetActiveActivityPlanRequest, GetActiveActivityPlanResponse>
    {
        private readonly IActivityRepository _ar;

        public GetActiveActivityPlanHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task<GetActiveActivityPlanResponse> Handle(GetActiveActivityPlanRequest request, CancellationToken cancellationToken)
        {
            Activity? activity = await _ar.GetActivityByActiveActivityPlanId(request.id, cancellationToken);

            if(activity is null)
                throw new KeyNotFoundException($"active ActivityPlan with id of \"{request.id}\" does not exist");

            GetActiveActivityPlanResponse? activityPlan = activity.ActivityPlans
                .Where(ap => ap.Id == request.id)
                .Select(ap => new GetActiveActivityPlanResponse(
                    ap.Activity.Name,
                    ap.ActiveVersion.DaysOfWeek,
                    ap.ActiveVersion.StartTime,
                    ap.ActiveVersion.EndTime,
                    ap.ActiveVersion.Duration
                ))
                .FirstOrDefault();

            if(activityPlan is null)
                throw new KeyNotFoundException($"active ActivityPlan with id of \"{request.id}\" does not exist");

            return activityPlan;
        }
    }

    public record GetActiveActivityPlanRequest(Guid id) : IRequest<GetActiveActivityPlanResponse>;

    public record GetActiveActivityPlanResponse(string activityName, DayOfWeek[] daysOfWeek, TimeOnly startTime, TimeOnly endTime, TimeSpan duration);
}