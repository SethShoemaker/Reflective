using Reflective.Domain.Entities.ActivityAggregate;

namespace Reflective.Domain.Persistence.Repositories
{
    public interface IActivityRepository
    {
        public Task SaveAsync(Activity activity, CancellationToken cancellationToken = default);

        public Task UpdateAsync(Activity activity, CancellationToken cancellationToken = default);

        public Task<List<Activity>> GetAllAsync(CancellationToken cancellationToken = default);

        public Task<Activity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        public Task<Tuple<string, string?>?> GetNameAndDescriptionByIdAsync(Guid id, CancellationToken cancellationToken = default);
    }
}