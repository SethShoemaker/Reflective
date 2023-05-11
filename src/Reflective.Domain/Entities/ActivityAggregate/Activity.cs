using Reflective.Domain.Entities.Common;
using Reflective.Domain.Exceptions;

namespace Reflective.Domain.Entities.ActivityAggregate
{
    public class Activity : EntityBase
    {
        private Activity(){}

        internal Activity(string name, string description)
        {
            Name = name;
            Description = description;
        }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public List<ActivitySession> Sessions { get; set; } = new();

        public ActivitySession? ActiveSession { get; set; }

        internal void StartSession()
        {
            if(ActiveSession is not null)
                throw new ActiveActivitySessionAlreadyExistsException($"There is already an active session for activity: \"{Name}\"");

            ActivitySession newSession = new(this);
            ActiveSession = newSession;
            Sessions.Add(newSession);
        }

        internal void EndSession()
        {
            if(ActiveSession is null)
                throw new ActiveActivitySessionDoesntExistException($"There is no active session for activity: \"{Name}\"");

            ActiveSession.End = DateTime.Now;
            ActiveSession = null;
        }
    }
}