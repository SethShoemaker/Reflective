using MediatR;
using Microsoft.AspNetCore.Mvc;
using Reflective.Api.Filters;

namespace Reflective.Api.Controllers
{
    [ApiController]
    [DomainExceptionFilter]
    public abstract class ApiControllerBase : ControllerBase
    {
        private IMediator? __mediator;

        protected IMediator _mediator { 
            get 
            {
                if(__mediator is null)
                {
                    __mediator = HttpContext.RequestServices.GetRequiredService<IMediator>();
                }
                return __mediator;
            }
        }
    }
}