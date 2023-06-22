using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities.ActivityPlans
{
    public class EndActivityPlanHandler : IRequestHandler<EndActivityPlanRequest>
    {
        private readonly IActivityRepository _ar;

        public EndActivityPlanHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task Handle(EndActivityPlanRequest request, CancellationToken cancellationToken)
        {
            Activity? activity = await _ar.GetActivityByActiveActivityPlanId(request.id);

            if(activity is null)
                throw new KeyNotFoundException($"active ActivityPlan with id of \"{request.id}\" does not exist");

            activity.EndPlan(request.id);

            await _ar.UpdateAsync(activity);
        }
    }

    public record EndActivityPlanRequest(Guid id) : IRequest;
}