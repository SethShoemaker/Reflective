using Reflective.Domain.Entities.ActivityPlanAggregate;
using Reflective.Domain.Entities.Common;
using Reflective.Domain.Exceptions;

namespace Reflective.Domain.Entities.ActivityAggregate
{
    public class Activity : EntityBase
    {
        private Activity(){}

        internal Activity(string name, string description)
        {
            Name = name;
            Description = description;
            TrackingPeriodStart = DateOnly.FromDateTime(DateTime.Today);
        }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public List<ActivitySession> Sessions { get; set; } = new();

        public ActivitySession? ActiveSession { get; set; }

        private DateOnly TrackingPeriodStart { get; set; }

        private DateOnly TrackingPeriodEnd { get; set; }

        private List<ActivityPlan> ActivityPlans { get; set; } = new();

        public bool IsNoLongerBeingTracked() => TrackingPeriodEnd != null;

        internal void StopTracking()
        {
            TrackingPeriodEnd = DateOnly.FromDateTime(DateTime.Today);

            foreach(ActivityPlan activityPlan in ActivityPlans)
                activityPlan.End();
        }

        internal void StartSession()
        {
            if(IsNoLongerBeingTracked())
                throw new ActivityIsNoLongerBeingTrackedException($"cannot start or end session for \"${Name}\", Activity is no longer being tracked");

            if(ActiveSession is not null)
                throw new ActiveActivitySessionAlreadyExistsException($"There is already an active session for activity: \"{Name}\"");

            ActivitySession newSession = new(this);
            ActiveSession = newSession;
            Sessions.Add(newSession);
        }

        internal void EndSession()
        {
            if(IsNoLongerBeingTracked())
                throw new ActivityIsNoLongerBeingTrackedException($"cannot start or end session for \"${Name}\", Activity is no longer being tracked");

            if(ActiveSession is null)
                throw new ActiveActivitySessionDoesntExistException($"There is no active session for activity: \"{Name}\"");

            ActiveSession.End = DateTime.Now;
            ActiveSession = null;
        }
    }
}