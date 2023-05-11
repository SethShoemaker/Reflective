using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Reflective.Domain.Persistence.Repositories;
using Reflective.Infrastructure.Persistence;
using Reflective.Infrastructure.Persistence.Repositories;

namespace Reflective.Infrastructure
{
    public static class DependencyInjection
    {
        public static void AddInfrastructureServices(this IServiceCollection services, string sqliteDataSource)
        {
            services.AddScoped<IActivityRepository, ActivityRepository>();
            services.AddScoped<IActivityPlanRepository, ActivityPlanRepository>();
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlite(new SqliteConnectionStringBuilder(){
                    Mode = SqliteOpenMode.ReadWriteCreate,
                    ForeignKeys = true,
                    DataSource = sqliteDataSource
                }.ToString());
            });
        }
    }
}