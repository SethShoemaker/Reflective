using MediatR;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities
{
    public class GetActivityNameHandler : IRequestHandler<GetActivityNameRequest, GetActivityNameResponse>
    {
        private readonly IActivityRepository _ar;

        public GetActivityNameHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task<GetActivityNameResponse> Handle(GetActivityNameRequest request, CancellationToken cancellationToken)
        {
            string? name = await _ar.GetNameByIdAsync(request.id, cancellationToken);

            return new GetActivityNameResponse(name);
        }
    }

    public record GetActivityNameRequest(Guid id) : IRequest<GetActivityNameResponse>;

    public record GetActivityNameResponse(string? name);
}