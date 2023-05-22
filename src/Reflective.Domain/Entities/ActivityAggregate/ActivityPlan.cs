using Reflective.Domain.Entities.Common;
using Reflective.Domain.Exceptions;

namespace Reflective.Domain.Entities.ActivityAggregate
{
    public class ActivityPlan : EntityBase
    {
        private ActivityPlan(){}

        internal ActivityPlan(string name, Activity activity, TimeOnly timeOfDay, TimeSpan duration, SortedSet<DayOfWeek> daysOfWeek)
        {
            Name = name;
            Activity = activity;

            Versions.Add(new(){
                ActivityPlan = this,
                StartDate = DateOnly.FromDateTime(DateTime.Now),
                EndDate = null,
                TimeOfDay = timeOfDay,
                Duration = duration,
                DaysOfWeek = daysOfWeek
            });
        }

        public string Name { get; set; } = null!;

        public Activity Activity { get; set; } = null!;

        public List<ActivityPlanVersion> Versions { get; set; } = new();

        internal void Adjust(TimeOnly timeOfDay, TimeSpan duration, SortedSet<DayOfWeek> daysOfWeek)
        {
            ActivityPlanVersion? latestVersion = Versions.FirstOrDefault(v => v.EndDate is null);

            if(latestVersion is null)
                throw new CannotAdjustEndedPlanException($"cannot adjust plan, already ended");

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

                Versions.Add(newVersion);
            }
        }

        internal void End()
        {
            ActivityPlanVersion? latestVersion = Versions.FirstOrDefault(v => v.EndDate is null);

            if(latestVersion is null) return;

            latestVersion.EndDate = DateOnly.FromDateTime(DateTime.Today - TimeSpan.FromDays(1));
        }
    }
}