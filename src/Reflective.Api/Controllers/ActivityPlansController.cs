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
            return await _mediator.Send(new ListActiveActivityPlansRequest());
        }

        [Route("active/{id}")]
        [HttpGet]
        public async Task<GetActiveActivityPlanResponse> GetActive(Guid id)
        {
            return await _mediator.Send(new GetActiveActivityPlanRequest(id));
        }

        [Route("end/{id}")]
        [HttpGet]
        public async Task End(Guid id)
        {
            await _mediator.Send(new EndActivityPlanRequest(id));
        }

        [Route("adjust/{id}")]
        [HttpPost]
        public async Task Adjust([FromRoute] Guid id, SaveAdjustRequest request)
        {
            await _mediator.Send(new AdjustActivityPlanRequest(id, request.daysOfWeek, request.startTime, request.endTime));
        }

        public record SaveAdjustRequest(DayOfWeek[] daysOfWeek, TimeOnly startTime, TimeOnly endTime);

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