using Microsoft.EntityFrameworkCore;
using Reflective.Domain.Entities.ActivityAggregate;

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