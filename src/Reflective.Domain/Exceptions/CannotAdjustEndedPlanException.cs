namespace Reflective.Domain.Exceptions
{
    public class CannotAdjustEndedPlanException : Exception
    {
        public CannotAdjustEndedPlanException(){}
        
        public CannotAdjustEndedPlanException(string? message) : base(message){}
    }
}