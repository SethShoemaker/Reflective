using MediatR;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities
{
    public class GetActivityNameHandler : IRequestHandler<GetActivityNameRequest, string>
    {
        private readonly IActivityRepository _ar;

        public GetActivityNameHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task<string> Handle(GetActivityNameRequest request, CancellationToken cancellationToken)
        {
            string? name = await _ar.GetNameByIdAsync(request.id, cancellationToken);

            if(name is null)
                throw new KeyNotFoundException($"Activity with id of \"{request.id}\" does not exist");

            return name;
        }
    }

    public record GetActivityNameRequest(Guid id) : IRequest<string>;
}