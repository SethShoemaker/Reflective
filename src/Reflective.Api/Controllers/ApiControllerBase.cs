using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Reflective.Api.Controllers
{
    [ApiController]
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