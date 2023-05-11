using Reflective.Domain.Entities.ActivityPlanAggregate;

namespace Reflective.Domain.Persistence.Repositories
{
    public interface IActivityPlanRepository
    {
        public Task SaveAsync(ActivityPlan activityPlan, CancellationToken cancellationToken = default);

        public Task UpdateAsync(ActivityPlan activityPlan, CancellationToken cancellationToken = default);
    }
}