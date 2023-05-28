using Reflective.Domain.Entities.Common;

namespace Reflective.Domain.Entities.ActivityAggregate
{
    public class ActivityPlan : EntityBase
    {
        private ActivityPlan(){}

        internal ActivityPlan(Activity activity, TimeOnly timeOfDay, TimeSpan duration, SortedSet<DayOfWeek> daysOfWeek)
        {
            Activity = activity;

            _versions.Add(new(){
                ActivityPlan = this,
                StartDate = DateOnly.FromDateTime(DateTime.Now),
                EndDate = null,
                TimeOfDay = timeOfDay,
                Duration = duration,
                DaysOfWeek = daysOfWeek
            });
        }

        public Activity Activity { get; private set; } = null!;

        private List<ActivityPlanVersion> _versions { get; set; } = new();

        public IReadOnlyList<ActivityPlanVersion> Versions 
        {
            get => _versions.AsReadOnly();
        }

        internal void Adjust(TimeOnly timeOfDay, TimeSpan duration, SortedSet<DayOfWeek> daysOfWeek)
        {
            ActivityPlanVersion? latestVersion = Versions.FirstOrDefault(v => v.EndDate is null);

            if(latestVersion is null)
                throw new InvalidOperationException($"cannot adjust plan, already ended");

            if(latestVersion.StartDate == DateOnly.FromDateTime(DateTime.Today))
            {
                latestVersion.TimeOfDay = timeOfDay;
                latestVersion.Duration = duration;
                latestVersion.DaysOfWeek = daysOfWeek;
            }
            else
            {
                latestVersion.EndDate = DateOnly.FromDateTime(DateTime.Today - TimeSpan.FromDays(1));

                ActivityPlanVersion newVersion = new()
                {
                    ActivityPlan = this,
                    StartDate = DateOnly.FromDateTime(DateTime.Now),
                    EndDate = null,
                    TimeOfDay = timeOfDay,
                    Duration = duration,
                    DaysOfWeek = daysOfWeek
                };

                _versions.Add(newVersion);
            }
        }

        internal void End()
        {
            ActivityPlanVersion? latestVersion = Versions.FirstOrDefault(v => v.EndDate is null);

            if(latestVersion is null)
                throw new InvalidOperationException($"cannot end activity plan with id of \"{Id}\", activity plan is already ended");

            latestVersion.EndDate = DateOnly.FromDateTime(DateTime.Today - TimeSpan.FromDays(1));
        }

        internal void EndIfNotAlreadyEnded()
        {
            ActivityPlanVersion? latestVersion = Versions.FirstOrDefault(v => v.EndDate is null);

            if(latestVersion is not null)
                latestVersion.EndDate = DateOnly.FromDateTime(DateTime.Today - TimeSpan.FromDays(1));
        }
    }
}