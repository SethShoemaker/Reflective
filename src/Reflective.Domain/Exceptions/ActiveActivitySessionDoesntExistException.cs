namespace Reflective.Domain.Exceptions
{
    public class ActiveActivitySessionDoesntExistException : Exception
    {
        public ActiveActivitySessionDoesntExistException(){}
        
        public ActiveActivitySessionDoesntExistException(string? message) : base(message){}
    }
}