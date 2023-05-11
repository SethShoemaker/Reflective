using Reflective.Domain.Entities.Common;

namespace Reflective.Domain.Entities
{
    public class ActivitySession : EntityBase
    {
        public Activity Activity { get; set; } = null!;

        public DateTime Start { get; set; }

        public DateTime? End { get; set; }
    }
}