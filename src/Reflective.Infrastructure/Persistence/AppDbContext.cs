using System.Text;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activity>().HasMany(a => a.Sessions).WithOne(a => a.Activity);
            modelBuilder.Entity<Activity>().HasOne(a => a.ActiveSession);
            modelBuilder.Entity<Activity>().Navigation(a => a.Sessions).AutoInclude();
            modelBuilder.Entity<Activity>().Navigation(a => a.Sessions).UsePropertyAccessMode(PropertyAccessMode.Field);

            modelBuilder.Entity<Activity>().HasMany(a => a.ActivityPlans).WithOne(ap => ap.Activity);
            modelBuilder.Entity<Activity>().Navigation(a => a.ActivityPlans).AutoInclude();
            modelBuilder.Entity<Activity>().Navigation(a => a.ActivityPlans).UsePropertyAccessMode(PropertyAccessMode.Field);

            modelBuilder.Entity<ActivityPlan>().Navigation(ap => ap.Activity).AutoInclude();

            modelBuilder.Entity<ActivityPlan>().HasMany(ap => ap.Versions).WithOne(apv => apv.ActivityPlan);
            modelBuilder.Entity<ActivityPlan>().Navigation(ap => ap.Versions).AutoInclude();
            modelBuilder.Entity<ActivityPlan>().Navigation(ap => ap.Versions).UsePropertyAccessMode(PropertyAccessMode.Field);

            modelBuilder
                .Entity<ActivityPlanVersion>()
                .Property(apv => apv.DaysOfWeek)
                .HasConversion(
                    a => new StringBuilder().AppendJoin(',', a).ToString(),
                    s => s.Split(',', StringSplitOptions.None).Select(dow => (DayOfWeek)Enum.Parse<DayOfWeek>(dow)).ToArray()
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}