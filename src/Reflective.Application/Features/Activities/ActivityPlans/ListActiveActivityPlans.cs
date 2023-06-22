using MediatR;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Application.Features.Activities.ActivityPlans
{
    public class ListActiveActivityPlansHandler : IRequestHandler<ListActiveActivityPlansRequest, List<ActivityPlanDto>>
    {
        private readonly IActivityRepository _ar;

        public ListActiveActivityPlansHandler(IActivityRepository ar)
        {
            _ar = ar;
        }

        public async Task<List<ActivityPlanDto>> Handle(ListActiveActivityPlansRequest request, CancellationToken cancellationToken)
        {
            IReadOnlyList<ActivityPlan> activityPlans = await _ar.GetAllActiveActivityPlansAsync(cancellationToken);

            return activityPlans.Select(a => new ActivityPlanDto
            {
                Id = a.Id,
                ActivityName = a.Activity.Name,
                DaysOfWeek = a.ActiveVersion.DaysOfWeek,
                Start = a.ActiveVersion.StartTime,
                End = a.ActiveVersion.EndTime,
                Duration = a.ActiveVersion.Duration
            }).ToList();
        }
    }

    public record ListActiveActivityPlansRequest : IRequest<List<ActivityPlanDto>>;

    public class ActivityPlanDto
    {
        public Guid Id { get; set; }

        public string ActivityName { get; set; } = null!;

        public DayOfWeek[] DaysOfWeek { get; set; } = null!;

        public TimeOnly Start { get; set; }

        public TimeOnly End { get; set; }

        public TimeSpan Duration { get; set; }
    }
}