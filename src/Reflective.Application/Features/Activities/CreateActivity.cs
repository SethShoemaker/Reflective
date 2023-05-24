using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities
{
    public class CreateActivityHandler : IRequestHandler<CreateActivityRequest, Guid>
    {
        private readonly IActivityRepository _ar;

        public CreateActivityHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task<Guid> Handle(CreateActivityRequest request, CancellationToken cancellationToken)
        {
            Activity activity = new(request.name, request.description);

            await _ar.SaveAsync(activity);

            return activity.Id;
        }
    }

    public record CreateActivityRequest(string name, string description) : IRequest<Guid>;
}