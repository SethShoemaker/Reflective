using Reflective.Domain.Entities.Common;

namespace Reflective.Domain.Entities.ActivityPlanAggregate
{
    public class ActivityPlanVersion : EntityBase
    {
        public ActivityPlan ActivityPlan { get; set; } = null!;

        public DateOnly StartDate { get; set; }
        
        public DateOnly? EndDate { get; set; }

        public TimeOnly TimeOfDay { get; set; }

        public TimeSpan Duration { get; set; }

        public SortedSet<DayOfWeek> DaysOfWeek { get; set; } = new();
    }
}