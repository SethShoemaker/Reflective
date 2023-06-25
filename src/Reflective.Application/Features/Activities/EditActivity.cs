using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities
{
    public class GetActivityEditDataHandler : IRequestHandler<GetActivityEditDataRequest, GetActivityEditDataResponse>
    {
        private readonly IActivityRepository _ar;

        public GetActivityEditDataHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task<GetActivityEditDataResponse> Handle(GetActivityEditDataRequest request, CancellationToken cancellationToken)
        {
            Tuple<string, string?>? nameAndDescription = await _ar.GetNameAndDescriptionByIdAsync(request.id, cancellationToken);

            if(nameAndDescription is null)
                throw new KeyNotFoundException($"Activity with Id of {request.id} does not exist");

            return new GetActivityEditDataResponse(nameAndDescription.Item1, nameAndDescription.Item2);
        }
    }

    public record GetActivityEditDataRequest(Guid id) : IRequest<GetActivityEditDataResponse>;

    public record GetActivityEditDataResponse(string name, string? description);





    public class SaveActivityEditDataHandler : IRequestHandler<SaveActivityEditDataRequest>
    {
        private readonly IActivityRepository _ar;

        public SaveActivityEditDataHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task Handle(SaveActivityEditDataRequest request, CancellationToken cancellationToken)
        {
            Activity? activity = await _ar.GetByIdAsync(request.id);

            if(activity is null)
                throw new KeyNotFoundException($"Activity with Id of {request.id} does not exist");

            activity.Name = request.name;
            activity.Description = request.description;

            await _ar.UpdateAsync(activity, cancellationToken);
        }
    }

    public record SaveActivityEditDataRequest(Guid id, string name, string? description) : IRequest;
}