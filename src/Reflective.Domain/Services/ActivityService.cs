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

        public async Task<Activity> CreateActivityAsync(string name, string description, CancellationToken cancellationToken = default)
        {
            Activity newActivity = new(name, description);
            await _ar.SaveAsync(newActivity, cancellationToken);
            return newActivity;
        }

        public async Task StartActivitySession(Activity activity, CancellationToken cancellationToken = default)
        {
            activity.StartSession();
            await _ar.UpdateAsync(activity, cancellationToken);
        }

        public async Task EndActivitySession(Activity activity, CancellationToken cancellationToken = default)
        {
            activity.EndSession();
            await _ar.UpdateAsync(activity, cancellationToken);
        }
    }
}