using Reflective.Domain.Entities.Common;
using Reflective.Domain.Exceptions;

namespace Reflective.Domain.Entities.ActivityAggregate
{
    public class Activity : EntityBase, IAggregateRoot
    {
        private Activity(){}

        public Activity(string name, string description)
        {
            Name = name;
            Description = description;
            TrackingPeriodStart = DateOnly.FromDateTime(DateTime.Today);
        }

        public string Name { get; private set; } = null!;

        public string Description { get; private set; } = null!;

        private DateOnly TrackingPeriodStart { get; set; }

        private DateOnly TrackingPeriodEnd { get; set; }

        public bool IsNoLongerBeingTracked() => TrackingPeriodEnd != null;

        public void StopTracking()
        {
            TrackingPeriodEnd = DateOnly.FromDateTime(DateTime.Today);

            foreach(ActivityPlan activityPlan in ActivityPlans)
                activityPlan.End();
        }

        public List<ActivitySession> Sessions { get; private set; } = new();

        public ActivitySession? ActiveSession { get; private set; }

        public void StartSession()
        {
            if(IsNoLongerBeingTracked())
                throw new ActivityIsNoLongerBeingTrackedException($"cannot start or end session for \"${Name}\", Activity is no longer being tracked");

            if(ActiveSession is not null)
                throw new ActiveActivitySessionAlreadyExistsException($"There is already an active session for activity: \"{Name}\"");

            ActivitySession newSession = new(this);
            ActiveSession = newSession;
            Sessions.Add(newSession);
        }

        public void EndSession()
        {
            if(IsNoLongerBeingTracked())
                throw new ActivityIsNoLongerBeingTrackedException($"cannot start or end session for \"${Name}\", Activity is no longer being tracked");

            if(ActiveSession is null)
                throw new ActiveActivitySessionDoesntExistException($"There is no active session for activity: \"{Name}\"");

            ActiveSession.End = DateTime.Now;
            ActiveSession = null;
        }

        private List<ActivityPlan> ActivityPlans { get; set; } = new();

        public void CreatePlan(string name, TimeOnly timeOfDay, TimeSpan duration, SortedSet<DayOfWeek> daysOfWeek)
        {
            ActivityPlan activityPlan = new(name, this, timeOfDay, duration, daysOfWeek);
            ActivityPlans.Add(activityPlan);
        }

        public void AdjustPlan(Guid planId, TimeOnly timeOfDay, TimeSpan duration, SortedSet<DayOfWeek> daysOfWeek)
        {
            if(IsNoLongerBeingTracked())
                throw new ActivityIsNoLongerBeingTrackedException($"cannot adjust activity plan for \"{Name}\", activity is no longer being tracked");

            ActivityPlan? plan = ActivityPlans.FirstOrDefault(ap => ap.Id == planId);
            if(plan is null)
                throw new ActivityPlanDoesntExistException($"ActivityPlan with id of \"${planId}\" doesn't exist for \"{Name}\"");

            plan.Adjust(timeOfDay, duration, daysOfWeek);
        }

        public void EndPlan(Guid planId)
        {
            if(IsNoLongerBeingTracked())
                throw new ActivityIsNoLongerBeingTrackedException($"cannot end activity plan for \"{Name}\", activity is no longer being tracked");

            ActivityPlan? plan = ActivityPlans.FirstOrDefault(ap => ap.Id == planId);
            if(plan is null)
                throw new ActivityPlanDoesntExistException($"ActivityPlan with id of \"${planId}\" doesn't exist for \"{Name}\"");

            plan.End();
        }
    }
}