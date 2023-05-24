namespace Reflective.Domain.Exceptions
{
    public class ActiveActivitySessionAlreadyExistsException : Exception
    {
        public ActiveActivitySessionAlreadyExistsException(){}
        
        public ActiveActivitySessionAlreadyExistsException(string? message) : base(message){}
    }
}