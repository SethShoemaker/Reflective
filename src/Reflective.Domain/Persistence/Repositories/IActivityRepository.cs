using Reflective.Domain.Entities.ActivityAggregate;

namespace Reflective.Domain.Persistence.Repositories
{
    public interface IActivityRepository
    {
        public Task SaveAsync(Activity activity, CancellationToken cancellationToken = default);

        public Task UpdateAsync(Activity activity, CancellationToken cancellationToken = default);

        public Task<List<Activity>> GetAll(CancellationToken cancellationToken = default);
    }
}