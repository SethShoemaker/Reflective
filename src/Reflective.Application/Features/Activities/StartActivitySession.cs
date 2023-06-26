using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities
{
    public class StartActivitySessionHandler : IRequestHandler<StartActivitySessionRequest>
    {
        private readonly IActivityRepository _ar;

        public StartActivitySessionHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task Handle(StartActivitySessionRequest request, CancellationToken cancellationToken)
        {
            Activity? activity = await _ar.GetByIdAsync(request.id, cancellationToken);

            if(activity is null)
                throw new KeyNotFoundException($"an activity with an id of \"{request.id}\" does not exist");

            activity.StartSession();

            await _ar.UpdateAsync(activity);
        }
    }

    public record StartActivitySessionRequest(Guid id) : IRequest;
}