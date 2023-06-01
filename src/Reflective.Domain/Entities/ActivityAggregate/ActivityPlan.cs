using Reflective.Domain.Entities.Common;

namespace Reflective.Domain.Entities.ActivityAggregate
{
    public class ActivityPlan : EntityBase
    {
        private ActivityPlan(){}

        internal ActivityPlan(Activity activity, TimeOnly startTime, TimeOnly endTime, DayOfWeek[] daysOfWeek)
        {
            Activity = activity;

            _versions.Add(new(){
                ActivityPlan = this,
                StartDate = DateOnly.FromDateTime(DateTime.Now),
                EndDate = null,
                StartTime = startTime,
                EndTime = endTime,
                DaysOfWeek = daysOfWeek
            });
        }

        public Activity Activity { get; private set; } = null!;

        private List<ActivityPlanVersion> _versions { get; set; } = new();

        public IReadOnlyList<ActivityPlanVersion> Versions 
        {
            get => _versions.AsReadOnly();
        }

        public ActivityPlanVersion? ActiveVersion
        {
            get => _versions.FirstOrDefault(v => v.EndDate is null);
        }

        internal void Adjust(TimeOnly startTime, TimeOnly endTime, DayOfWeek[] daysOfWeek)
        {
            if(ActiveVersion is null)
                throw new InvalidOperationException($"cannot adjust plan, already ended");

            if(ActiveVersion.StartDate == DateOnly.FromDateTime(DateTime.Today))
            {
                ActiveVersion.StartTime = startTime;
                ActiveVersion.EndTime = endTime;
                ActiveVersion.DaysOfWeek = daysOfWeek;
            }
            else
            {
                ActiveVersion.EndDate = DateOnly.FromDateTime(DateTime.Today - TimeSpan.FromDays(1));

                ActivityPlanVersion newVersion = new()
                {
                    ActivityPlan = this,
                    StartDate = DateOnly.FromDateTime(DateTime.Now),
                    EndDate = null,
                    StartTime = startTime,
                    EndTime = endTime,
                    DaysOfWeek = daysOfWeek
                };

                _versions.Add(newVersion);
            }
        }

        internal void End()
        {
            if(ActiveVersion is null)
                throw new InvalidOperationException($"cannot end activity plan with id of \"{Id}\", activity plan is already ended");

            ActiveVersion.EndDate = DateOnly.FromDateTime(DateTime.Today - TimeSpan.FromDays(1));
        }

        internal void EndIfNotAlreadyEnded()
        {
            if(ActiveVersion is not null)
                ActiveVersion.EndDate = DateOnly.FromDateTime(DateTime.Today - TimeSpan.FromDays(1));
        }
    }
}