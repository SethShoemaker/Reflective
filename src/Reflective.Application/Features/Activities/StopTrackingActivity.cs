using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities
{
    public class StopTrackingActivityHandler : IRequestHandler<StopTrackingActivityRequest>
    {
        private readonly IActivityRepository _ar;

        public StopTrackingActivityHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task Handle(StopTrackingActivityRequest request, CancellationToken cancellationToken)
        {
            Activity? activity = await _ar.GetByIdAsync(request.id, cancellationToken);

            if(activity is null)
                throw new KeyNotFoundException($"Activity with id of \"{request.id}\" does not exist");

            activity.StopTracking();

            await _ar.UpdateAsync(activity, cancellationToken);
        }
    }

    public record StopTrackingActivityRequest(Guid id) : IRequest;
}