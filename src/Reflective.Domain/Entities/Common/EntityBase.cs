namespace Reflective.Domain.Entities.Common
{
    public class EntityBase
    {
        public Guid Id { get; set; }

        public bool Is(EntityBase? entity)
        {
            if (entity == null || GetType() != entity.GetType())
            {
                return false;
            }

            return Id == entity.Id;
        }
    }
}