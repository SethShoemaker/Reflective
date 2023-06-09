using Reflective.Domain.Entities.ActivityAggregate;

namespace Reflective.Domain.Persistence.Repositories
{
    public interface IActivityRepository
    {
        public Task SaveAsync(Activity activity, CancellationToken cancellationToken = default);

        public Task UpdateAsync(Activity activity, CancellationToken cancellationToken = default);

        public Task<List<Activity>> GetAllThatAreBeingTrackedAsync(CancellationToken cancellationToken = default);

        public Task<Activity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        public Task<Tuple<string, string?>?> GetNameAndDescriptionByIdAsync(Guid id, CancellationToken cancellationToken = default);

        public Task<string?> GetNameByIdAsync(Guid id, CancellationToken cancellationToken = default);

        public Task RemoveAsync(Activity activity, CancellationToken cancellationToken = default);

        public Task<IReadOnlyList<ActivityPlan>> GetAllActiveActivityPlansAsync(CancellationToken cancellationToken = default);

        public Task<ActivityPlan?> GetActivityPlanByIdAsync(Guid id, CancellationToken cancellationToken = default);

        public Task<Activity?> GetActivityByActiveActivityPlanId(Guid activityPlanId, CancellationToken cancellationToken = default);

        public Task<List<Activity>> GetActivitiesTrackedOnDateAsync(DateOnly date, CancellationToken cancellationToken = default);
    }
}