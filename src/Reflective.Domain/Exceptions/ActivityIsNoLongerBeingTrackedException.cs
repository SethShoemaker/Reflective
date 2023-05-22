namespace Reflective.Domain.Exceptions
{
    public class ActivityIsNoLongerBeingTrackedException : Exception
    {
        public ActivityIsNoLongerBeingTrackedException(){}
        
        public ActivityIsNoLongerBeingTrackedException(string? message) : base(message){}
    }
}