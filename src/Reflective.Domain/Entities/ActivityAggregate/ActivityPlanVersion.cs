using Reflective.Domain.Entities.Common;

namespace Reflective.Domain.Entities.ActivityAggregate
{
    public class ActivityPlanVersion : EntityBase
    {
        public ActivityPlan ActivityPlan { get; internal set; } = null!;

        public DateOnly StartDate { get; internal set; }
        
        public DateOnly? EndDate { get; internal set; }

        public TimeOnly TimeOfDay { get; internal set; }

        public TimeSpan Duration { get; internal set; }

        public SortedSet<DayOfWeek> DaysOfWeek { get; internal set; } = new();
    }
}