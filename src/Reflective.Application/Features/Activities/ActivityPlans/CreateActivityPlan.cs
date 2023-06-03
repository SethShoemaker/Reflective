using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities.ActivityPlans
{
    public class CreateActivityPlanHandler : IRequestHandler<CreateActivityPlanRequest>
    {
        private readonly IActivityRepository _ar;

        public CreateActivityPlanHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task Handle(CreateActivityPlanRequest request, CancellationToken cancellationToken)
        {
            Activity? activity = await _ar.GetByIdAsync(request.activityId, cancellationToken);

            if(activity is null)
                throw new KeyNotFoundException($"Activity with id of \"{request.activityId}\" does not exist");

            activity.CreatePlan(request.startTime, request.endTime, request.daysOfWeek);

            await _ar.UpdateAsync(activity, cancellationToken);
        }
    }

    public record CreateActivityPlanRequest(Guid activityId, TimeOnly startTime, TimeOnly endTime, DayOfWeek[] daysOfWeek) : IRequest;
}