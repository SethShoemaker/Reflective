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

        public async Task StopTrackingActivityAsync(Activity activity, CancellationToken cancellationToken = default)
        {
            if(activity.TrackingPeriodStart == DateOnly.FromDateTime(DateTime.Today))
            {
                await _ar.RemoveAsync(activity);

                return;
            }

            activity.StopTracking();

            await _ar.UpdateAsync(activity);
        }
    }
}