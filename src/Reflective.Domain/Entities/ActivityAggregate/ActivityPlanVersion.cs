using Reflective.Domain.Entities.Common;

namespace Reflective.Domain.Entities.ActivityAggregate
{
    public class ActivityPlanVersion : EntityBase
    {
        public ActivityPlan ActivityPlan { get; internal set; } = null!;

        public DateOnly StartDate { get; internal set; }
        
        public DateOnly? EndDate { get; internal set; }

        public TimeOnly StartTime { get; internal set; }

        public TimeOnly EndTime { get; internal set; }

        public DayOfWeek[] DaysOfWeek { get; internal set; } = null!;
    }
}