namespace Reflective.Domain.Exceptions
{
    public class ActivityPlanDoesntExistException : Exception
    {
        public ActivityPlanDoesntExistException(){}
        
        public ActivityPlanDoesntExistException(string? message) : base(message){}
    }
}