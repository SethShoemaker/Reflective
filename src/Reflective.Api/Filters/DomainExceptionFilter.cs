using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Reflective.Api.Filters
{
    /// <summary>
    /// will catch exceptions thrown by domain layer, and translate them into a HttpResponseException
    /// </summary>
    public class DomainExceptionFilter : ExceptionFilterAttribute
    {
        private readonly Dictionary<Type, Action<ExceptionContext>> _exceptionHandlers;

        public DomainExceptionFilter()
        {
            // Register known exception types and handlers.
            _exceptionHandlers = new Dictionary<Type, Action<ExceptionContext>>
            {
                { typeof(ValidationException), HandleValidationException },
                { typeof(InvalidOperationException), HandlerInvalidOperationException }
            };
        }

        public override void OnException(ExceptionContext context)
        {
            Type type = context.Exception.GetType();

            if (_exceptionHandlers.ContainsKey(type))
            {
                _exceptionHandlers[type].Invoke(context);

                context.ExceptionHandled = true;

                return;
            }

            base.OnException(context);
        }

        private void HandleValidationException(ExceptionContext context)
        {
            var exception = (ValidationException)context.Exception;

            context.Result = new BadRequestObjectResult(exception.Message);
        }

        private void HandlerInvalidOperationException(ExceptionContext context)
        {
            var exception = (InvalidOperationException)context.Exception;

            context.Result = new BadRequestObjectResult(exception.Message);
        }
    }
}