using Microsoft.AspNetCore.Mvc;
using Reflective.Application.Features.Activities.ActivityPlans;

namespace Reflective.Api.Controllers
{
    [Route("api/activities/plans")]
    public class ActivityPlansController : ApiControllerBase
    {
        [Route("list")]
        [HttpGet]
        public async Task<List<ActivityPlanDto>> List()
        {
            return await _mediator.Send(new ListActivityPlansRequest());
        }
    }
}