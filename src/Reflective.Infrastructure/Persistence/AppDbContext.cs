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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activity>().HasMany(a => a.Sessions).WithOne(a => a.Activity);
            modelBuilder.Entity<Activity>().HasOne(a => a.ActiveSession);

            base.OnModelCreating(modelBuilder);
        }
    }
}