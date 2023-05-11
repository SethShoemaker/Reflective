using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Reflective.Domain.Persistence.Repositories;
using Reflective.Infrastructure.Persistence;
using Reflective.Infrastructure.Persistence.Repositories;

namespace Reflective.Infrastructure
{
    public static class DependencyInjection
    {
        public static void AddInfrastructureServices(this IServiceCollection services, string connectionString)
        {
            services.AddSingleton<IActivityRepository, ActivityRepository>();
            services.AddSingleton<IActivityPlanRepository, ActivityPlanRepository>();
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlite(connectionString);
            });
        }
    }
}