using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities
{
    public class EndActivitySessionHandler : IRequestHandler<EndActivitySessionRequest>
    {
        private readonly IActivityRepository _ar;

        public EndActivitySessionHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task Handle(EndActivitySessionRequest request, CancellationToken cancellationToken)
        {
            Activity? activity = await _ar.GetByIdAsync(request.id, cancellationToken);

            if(activity is null)
                throw new KeyNotFoundException($"an activity with an id of \"{request.id}\" does not exist");

            activity.EndSession();

            await _ar.UpdateAsync(activity);
        }
    }

    public record EndActivitySessionRequest(Guid id) : IRequest;
}