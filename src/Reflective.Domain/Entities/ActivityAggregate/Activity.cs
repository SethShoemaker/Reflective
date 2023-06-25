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
                if(string.IsNullOrWhiteSpace(value))
                    throw new ValidationException("Activity name cannot be white space");

                value = value.Trim();

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
                if(string.IsNullOrWhiteSpace(value) || value.Length == 0)
                {
                    _description = null;
                    return;
                }

                value = value.Trim();

                if(value.Length > 55)
                    throw new ValidationException("Activity description cannot be longer than 55 characters");

                _description = value;
            }
        }

        public DateOnly TrackingPeriodStart { get; private set; }

        public DateOnly? TrackingPeriodEnd { get; private set; }

        public bool IsNoLongerBeingTracked() => TrackingPeriodEnd != null;

        internal void StopTracking()
        {
            if(ActiveSession is not null)
                _sessions.Remove(ActiveSession);
                
            _sessions.RemoveAll(s => s.Start >= DateTime.Today);

            TrackingPeriodEnd = DateOnly.FromDateTime(DateTime.Today - TimeSpan.FromDays(1));

            foreach(ActivityPlan activityPlan in ActivityPlans)
                activityPlan.EndIfNotAlreadyEnded();
        }

        private List<ActivitySession> _sessions = new();

        public IReadOnlyList<ActivitySession> Sessions
        {
            get => _sessions.AsReadOnly();
        }

        public ActivitySession? ActiveSession 
        {
            get => _sessions.FirstOrDefault(s => s.End is null);
        }

        public void StartSession()
        {
            if(IsNoLongerBeingTracked())
                throw new InvalidOperationException($"cannot start or end session for \"${Name}\", Activity is no longer being tracked");

            if(ActiveSession is not null)
                throw new InvalidOperationException($"There is already an active session for activity: \"{Name}\"");

            ActivitySession newSession = new(this);
            _sessions.Add(newSession);
        }

        public void EndSession()
        {
            if(IsNoLongerBeingTracked())
                throw new InvalidOperationException($"cannot start or end session for \"${Name}\", Activity is no longer being tracked");

            if(ActiveSession is null)
                throw new InvalidOperationException($"There is no active session for activity: \"{Name}\"");

            ActiveSession.EndSession();
        }

        private List<ActivityPlan> _activityPlans = new();

        public IReadOnlyList<ActivityPlan> ActivityPlans
        {
            get => _activityPlans.AsReadOnly();
        }

        public void CreatePlan(TimeOnly startTime, TimeOnly endTime, DayOfWeek[] daysOfWeek)
        {
            ActivityPlan activityPlan = new(this, startTime, endTime, daysOfWeek);
            _activityPlans.Add(activityPlan);
        }

        public void AdjustPlan(Guid planId, TimeOnly startTime, TimeOnly endTime, DayOfWeek[] daysOfWeek)
        {
            if(IsNoLongerBeingTracked())
                throw new InvalidOperationException($"cannot adjust activity plan for \"{Name}\", activity is no longer being tracked");

            ActivityPlan? plan = _activityPlans.FirstOrDefault(ap => ap.Id == planId);
            if(plan is null)
                throw new KeyNotFoundException($"ActivityPlan with id of \"{planId}\" doesn't exist for \"{Name}\"");

            plan.Adjust(startTime, endTime, daysOfWeek);
        }

        public void EndPlan(Guid planId)
        {
            if(IsNoLongerBeingTracked())
                throw new InvalidOperationException($"cannot end activity plan for \"{Name}\", activity is no longer being tracked");

            ActivityPlan? plan = _activityPlans.FirstOrDefault(ap => ap.Id == planId);
            if(plan is null)
                throw new KeyNotFoundException($"ActivityPlan with id of \"${planId}\" doesn't exist for \"{Name}\"");

            plan.End();

            if(plan.Versions.Count == 0)
                _activityPlans.Remove(plan);
        }
    }
}