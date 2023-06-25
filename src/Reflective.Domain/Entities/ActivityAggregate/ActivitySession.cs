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

        public DateTime? End { get; private set; }

        internal void EndSession()
        {
            if(End is not null)
                throw new InvalidOperationException("cannot end session that is already ended");

            End = DateTime.Now;
        }
    }
}