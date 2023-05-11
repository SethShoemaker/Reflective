using Microsoft.EntityFrameworkCore;
using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Entities.ActivityPlanAggregate;

namespace Reflective.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Activity> Activities { get; set; } = null!;

        public DbSet<ActivityPlan> ActivityPlans { get; set; } = null!;
    }
}