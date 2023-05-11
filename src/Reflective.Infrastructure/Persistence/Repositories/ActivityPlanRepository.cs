using Reflective.Domain.Entities.ActivityPlanAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Infrastructure.Persistence.Repositories
{
    public class ActivityPlanRepository : RepositoryBase, IActivityPlanRepository
    {
        public ActivityPlanRepository(AppDbContext context) : base(context){}

        public async Task SaveAsync(ActivityPlan activityPlan, CancellationToken cancellationToken = default)
        {
            _context.ActivityPlans.Add(activityPlan);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task UpdateAsync(ActivityPlan activityPlan, CancellationToken cancellationToken = default)
        {
            _context.ActivityPlans.Update(activityPlan);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}