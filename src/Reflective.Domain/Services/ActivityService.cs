using Reflective.Domain.Entities.ActivityAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Domain.Services
{
    public class ActivityService
    {
        private readonly IActivityRepository _ar;

        public ActivityService(IActivityRepository ar)
        {
            _ar = ar;
        }
    }
}