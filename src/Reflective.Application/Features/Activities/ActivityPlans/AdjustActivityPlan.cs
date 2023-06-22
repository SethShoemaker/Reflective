using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities.ActivityPlans
{
    public class GetActivityPlanAdjustDataHandler : IRequestHandler<GetActivityPlanAdjustDataRequest, GetActivityPlanAdjustDataResponse>
    {
        private readonly IActivityRepository _ar;

        public GetActivityPlanAdjustDataHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task<GetActivityPlanAdjustDataResponse> Handle(GetActivityPlanAdjustDataRequest request, CancellationToken cancellationToken)
        {
            ActivityPlan? activityPlan = await _ar.GetActivityPlanByIdAsync(request.id, cancellationToken);

            if(activityPlan is null)
                throw new KeyNotFoundException($"ActivityPlan with the id of \"{request.id}\" does not exist");

            return new GetActivityPlanAdjustDataResponse(
                daysOfWeek: activityPlan.ActiveVersion.DaysOfWeek,
                start: activityPlan.ActiveVersion.StartTime,
                end: activityPlan.ActiveVersion.EndTime
            );
        }
    }

    public record GetActivityPlanAdjustDataRequest(Guid id) : IRequest<GetActivityPlanAdjustDataResponse>;

    public record GetActivityPlanAdjustDataResponse(DayOfWeek[] daysOfWeek, TimeOnly start, TimeOnly end);







    public class SaveActivityPlanAdjustDataHandler : IRequestHandler<SaveActivityPlanAdjustDataRequest>
    {
        private readonly IActivityRepository _ar;

        public SaveActivityPlanAdjustDataHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task Handle(SaveActivityPlanAdjustDataRequest request, CancellationToken cancellationToken)
        {
            Activity? activity = await _ar.GetActivityByActivityPlanId(request.id, cancellationToken);

            if(activity is null)
                throw new KeyNotFoundException($"ActivityPlan with the id of \"{request.id}\" does not exist");

            activity.AdjustPlan(request.id, request.startTime, request.endTime, request.daysOfWeek);

            await _ar.UpdateAsync(activity);
        }
    }

    public record SaveActivityPlanAdjustDataRequest(Guid id, DayOfWeek[] daysOfWeek, TimeOnly startTime, TimeOnly endTime) : IRequest;
}