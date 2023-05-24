using System.ComponentModel.DataAnnotations;
using Reflective.Domain.Entities.Common;

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

        private string _name { get; set; } = null!;

        public string Name 
        {
            get => _name;
            set 
            {
                if(value.Length > 10)
                    throw new ValidationException("Activity name cannot be longer than 10 characters");

                if(value.Length == 0)
                    throw new ValidationException("Activity name cannot be empty");

                _name = value;
            }
        }

        private string? _description { get; set; }

        public string? Description 
        {
            get => _description;
            set 
            {
                if(value == null || value.Length == 0)
                {
                    _description = null;
                    return;
                }
                    
                if(value.Length > 55)
                    throw new ValidationException("Activity description cannot be longer than 55 characters");

                _description = value;
            }
        }

        private DateOnly TrackingPeriodStart { get; set; }

        private DateOnly? TrackingPeriodEnd { get; set; }

        public bool IsNoLongerBeingTracked() => TrackingPeriodEnd != null;

        public void StopTracking()
        {
            TrackingPeriodEnd = DateOnly.FromDateTime(DateTime.Today);

            foreach(ActivityPlan activityPlan in ActivityPlans)
                activityPlan.EndIfNotAlreadyEnded();
        }

        public List<ActivitySession> Sessions { get; private set; } = new();

        public ActivitySession? ActiveSession { get; private set; }

        public void StartSession()
        {
            if(IsNoLongerBeingTracked())
                throw new InvalidOperationException($"cannot start or end session for \"${Name}\", Activity is no longer being tracked");

            if(ActiveSession is not null)
                throw new InvalidOperationException($"There is already an active session for activity: \"{Name}\"");

            ActivitySession newSession = new(this);
            ActiveSession = newSession;
            Sessions.Add(newSession);
        }

        public void EndSession()
        {
            if(IsNoLongerBeingTracked())
                throw new InvalidOperationException($"cannot start or end session for \"${Name}\", Activity is no longer being tracked");

            if(ActiveSession is null)
                throw new InvalidOperationException($"There is no active session for activity: \"{Name}\"");

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
                throw new InvalidOperationException($"cannot adjust activity plan for \"{Name}\", activity is no longer being tracked");

            ActivityPlan? plan = ActivityPlans.FirstOrDefault(ap => ap.Id == planId);
            if(plan is null)
                throw new KeyNotFoundException($"ActivityPlan with id of \"{planId}\" doesn't exist for \"{Name}\"");

            plan.Adjust(timeOfDay, duration, daysOfWeek);
        }

        public void EndPlan(Guid planId)
        {
            if(IsNoLongerBeingTracked())
                throw new InvalidOperationException($"cannot end activity plan for \"{Name}\", activity is no longer being tracked");

            ActivityPlan? plan = ActivityPlans.FirstOrDefault(ap => ap.Id == planId);
            if(plan is null)
                throw new KeyNotFoundException($"ActivityPlan with id of \"${planId}\" doesn't exist for \"{Name}\"");

            plan.End();
        }
    }
}