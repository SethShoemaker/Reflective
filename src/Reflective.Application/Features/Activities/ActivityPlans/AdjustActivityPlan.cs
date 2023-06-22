using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities.ActivityPlans
{
    public class AdjustActivityPlanHandler : IRequestHandler<AdjustActivityPlanRequest>
    {
        private readonly IActivityRepository _ar;

        public AdjustActivityPlanHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task Handle(AdjustActivityPlanRequest request, CancellationToken cancellationToken)
        {
            Activity? activity = await _ar.GetActivityByActiveActivityPlanId(request.id, cancellationToken);

            if(activity is null)
                throw new KeyNotFoundException($"active ActivityPlan with the id of \"{request.id}\" does not exist");

            activity.AdjustPlan(request.id, request.startTime, request.endTime, request.daysOfWeek);

            await _ar.UpdateAsync(activity);
        }
    }

    public record AdjustActivityPlanRequest(Guid id, DayOfWeek[] daysOfWeek, TimeOnly startTime, TimeOnly endTime) : IRequest;
}