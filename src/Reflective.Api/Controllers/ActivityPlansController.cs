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

        [Route("create")]
        [HttpPost]
        public async Task Create(CreateActivityPlanRequest request)
        {
            await _mediator.Send(new CreateActivityPlanRequest(
                request.activityId, 
                request.startTime, 
                request.endTime, 
                request.daysOfWeek
            ));
        }
    }
}