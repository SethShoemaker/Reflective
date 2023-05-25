using Microsoft.EntityFrameworkCore;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Infrastructure.Persistence.Repositories
{
    public class ActivityRepository : RepositoryBase, IActivityRepository
    {
        public ActivityRepository(AppDbContext context) : base(context){}

        public async Task<List<Activity>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Activities.ToListAsync(cancellationToken);
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
    }
}