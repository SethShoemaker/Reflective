using Microsoft.Extensions.DependencyInjection;
using Reflective.Domain.Services;

namespace Reflective.Domain
{
    public static class DependencyInjection
    {
        public static void ConfigureDomainServices(this IServiceCollection services)
        {
            services.AddSingleton<ActivityService>();
            services.AddSingleton<ActivityPlanService>();
        }
    }
}