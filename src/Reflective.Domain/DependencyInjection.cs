using Microsoft.Extensions.DependencyInjection;
using Reflective.Domain.Services;

namespace Reflective.Domain
{
    public static class DependencyInjection
    {
        public static void AddDomainServices(this IServiceCollection services)
        {
            services.AddScoped<ActivityService>();
        }
    }
}