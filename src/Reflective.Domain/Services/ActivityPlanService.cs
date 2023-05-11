using Reflective.Domain.Entities;
using Reflective.Domain.Entities.ActivityPlanAggregate;
using Reflective.Domain.Persistence.Repositories;

namespace Reflective.Domain.Services
{
    public class ActivityPlanService
    {
        private readonly IActivityPlanRepository _repo;

        public ActivityPlanService(IActivityPlanRepository repo)
        {
            _repo = repo;
        }

        public async Task<ActivityPlan> CreateActivityPlanAsync(string name, Activity activity, TimeOnly timeOfDay, TimeSpan duration, SortedSet<DayOfWeek> daysOfWeek, CancellationToken cancellationToken = default)
        {
            ActivityPlan newActivityPlan = new(name, activity, timeOfDay, duration, daysOfWeek);
            await _repo.SaveAsync(newActivityPlan, cancellationToken);
            return newActivityPlan;
        }

        public async Task AdjustActivityPlanAsync(ActivityPlan activityPlan, TimeOnly timeOfDay, TimeSpan duration, SortedSet<DayOfWeek> daysOfWeek, CancellationToken cancellationToken = default)
        {
            activityPlan.Adjust(timeOfDay, duration, daysOfWeek);
            await _repo.UpdateAsync(activityPlan, cancellationToken);
        }

        public async Task EndPlanAsync(ActivityPlan activityPlan, CancellationToken cancellationToken = default)
        {
            activityPlan.End();
            await _repo.UpdateAsync(activityPlan, cancellationToken);
        }
    }
}