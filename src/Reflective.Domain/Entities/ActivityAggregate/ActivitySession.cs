using Reflective.Domain.Entities.Common;

namespace Reflective.Domain.Entities.ActivityAggregate
{
    public class ActivitySession : EntityBase
    {
        private ActivitySession(){}

        internal ActivitySession(Activity activity)
        {
            Activity = activity;
            Start = DateTime.Now;
        }

        public Activity Activity { get; private set; } = null!;

        public DateTime Start { get; internal set; }

        public DateTime? End { get; internal set; }
    }
}