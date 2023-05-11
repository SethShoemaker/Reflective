using Reflective.Domain.Entities.Common;

namespace Reflective.Domain.Entities
{
    public class Activity : EntityBase
    {
        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;
    }
}