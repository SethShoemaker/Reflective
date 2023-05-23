using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities
{
    public class ListActivitiesHandler : IRequestHandler<ListActivitiesRequest, List<ActivityDto>>
    {
        private readonly IActivityRepository _activityRepo;

        public ListActivitiesHandler(IActivityRepository activityRepo)
        {
            _activityRepo = activityRepo;
        }

        public async Task<List<ActivityDto>> Handle(ListActivitiesRequest request, CancellationToken cancellationToken)
        {
            List<Activity> activities = await _activityRepo.GetAll(cancellationToken);

            return activities.Select(a => new ActivityDto
            {
                Id = a.Id,
                Name = a.Name
            }).ToList();
        }
    }

    public record ListActivitiesRequest : IRequest<List<ActivityDto>>;

    public class ActivityDto
    {
        public Guid Id { get; init; }

        public string Name { get; init; } = null!;
    }
}