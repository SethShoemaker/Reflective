using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;
using Reflective.Domain.Services;

namespace Reflective.Application.Features.Activities
{
    public class StopTrackingActivityHandler : IRequestHandler<StopTrackingActivityRequest>
    {
        private readonly IActivityRepository _ar;
        private readonly ActivityService _activityService;

        public StopTrackingActivityHandler(IActivityRepository ar, ActivityService activityService)
        {
            _ar = ar;
            _activityService = activityService;
        }

        public async Task Handle(StopTrackingActivityRequest request, CancellationToken cancellationToken)
        {
            Activity? activity = await _ar.GetByIdAsync(request.id, cancellationToken);

            if(activity is null)
                throw new KeyNotFoundException($"Activity with id of \"{request.id}\" does not exist");

            await _activityService.StopTrackingActivityAsync(activity, cancellationToken);
        }
    }

    public record StopTrackingActivityRequest(Guid id) : IRequest;
}