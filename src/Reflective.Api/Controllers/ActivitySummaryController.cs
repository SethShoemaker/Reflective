using Microsoft.AspNetCore.Mvc;
using Reflective.Application.Features.Activities.GetActivitySummaryOfDate;

namespace Reflective.Api.Controllers
{
    [Route("api/activities/summary")]
    public class ActivitySummaryController : ApiControllerBase
    {
        [Route("{date}")]
        [HttpGet]
        public async Task<List<SummaryActivityDto>> Get(DateOnly date)
        {
            return await _mediator.Send(new GetActivitySummaryOfDateRequest(date));
        }
    }
}