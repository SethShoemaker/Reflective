using Microsoft.AspNetCore.Mvc;
using Reflective.Application.Features.Activities;

namespace Reflective.Api.Controllers
{
    [Route("api/activities")]
    public class ActivitiesController : ApiControllerBase
    {
        [Route("list")]
        [HttpGet]
        public async Task<List<ActivityDto>> List()
        {
            return await _mediator.Send(new ListActivitiesRequest());
        }
    }
}