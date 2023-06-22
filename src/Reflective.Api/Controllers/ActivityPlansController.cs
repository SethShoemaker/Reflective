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

        [Route("adjust/{id}")]
        [HttpGet]
        public async Task<GetActivityPlanAdjustDataResponse> GetAdjust([FromRoute] Guid id)
        {
            return await _mediator.Send(new GetActivityPlanAdjustDataRequest(id));
        }

        [Route("adjust/{id}")]
        [HttpPost]
        public async Task SaveAdjust([FromRoute] Guid id, SaveAdjustRequest request)
        {
            await _mediator.Send(new SaveActivityPlanAdjustDataRequest(id, request.daysOfWeek, request.startTime, request.endTime));
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