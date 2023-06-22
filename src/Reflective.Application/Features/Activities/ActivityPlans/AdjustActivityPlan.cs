using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities.ActivityPlans
{
    public class SaveActivityPlanAdjustDataHandler : IRequestHandler<SaveActivityPlanAdjustDataRequest>
    {
        private readonly IActivityRepository _ar;

        public SaveActivityPlanAdjustDataHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task Handle(SaveActivityPlanAdjustDataRequest request, CancellationToken cancellationToken)
        {
            Activity? activity = await _ar.GetActivityByActiveActivityPlanId(request.id, cancellationToken);

            if(activity is null)
                throw new KeyNotFoundException($"active ActivityPlan with the id of \"{request.id}\" does not exist");

            activity.AdjustPlan(request.id, request.startTime, request.endTime, request.daysOfWeek);

            await _ar.UpdateAsync(activity);
        }
    }

    public record SaveActivityPlanAdjustDataRequest(Guid id, DayOfWeek[] daysOfWeek, TimeOnly startTime, TimeOnly endTime) : IRequest;
}