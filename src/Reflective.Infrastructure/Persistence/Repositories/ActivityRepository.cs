using Microsoft.EntityFrameworkCore;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Infrastructure.Persistence.Repositories
{
    public class ActivityRepository : RepositoryBase, IActivityRepository
    {
        public ActivityRepository(AppDbContext context) : base(context){}

        public async Task<List<Activity>> GetAllThatAreBeingTrackedAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Activities
                .Where(a => a.TrackingPeriodEnd == null)
                .ToListAsync(cancellationToken);
        }

        public async Task SaveAsync(Activity activity, CancellationToken cancellationToken = default)
        {
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task UpdateAsync(Activity activity, CancellationToken cancellationToken = default)
        {
            _context.Activities.Update(activity);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<Activity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Activities
                .Where(a => a.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Tuple<string, string?>?> GetNameAndDescriptionByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Activities
                .Where(a => a.Id == id)
                .Select(a => new Tuple<string, string?>(a.Name, a.Description))
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<string?> GetNameByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Activities
                .Where(a => a.Id == id)
                .Select(a => a.Name)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task RemoveAsync(Activity activity, CancellationToken cancellationToken = default)
        {
            _context.Activities.Remove(activity);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}