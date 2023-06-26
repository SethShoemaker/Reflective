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

        [Route("create")]
        [HttpPost]
        public async Task<Guid> Create(CreateActivityRequest request)
        {
            return await _mediator.Send(request);
        }

        [Route("edit/{id}")]
        [HttpGet]
        public async Task<GetActivityEditDataResponse> GetEdit([FromRoute] Guid id)
        {
            return await _mediator.Send(new GetActivityEditDataRequest(id));
        }

        [Route("edit/{id}")]
        [HttpPost]
        public async Task SaveEdit([FromRoute] Guid id, SaveEditRequest request)
        {
            await _mediator.Send(new SaveActivityEditDataRequest(id, request.name, request.description));
            return;
        }

        public record SaveEditRequest(string name, string? description);

        [Route("get-name/{id}")]
        [HttpGet]
        public async Task<GetActivityNameResponse> GetName([FromRoute] Guid id)
        {
            return await _mediator.Send(new GetActivityNameRequest(id));
        }

        [Route("stop-tracking/{id}")]
        [HttpGet]
        public async Task StopTracking([FromRoute] Guid id)
        {
            await _mediator.Send(new StopTrackingActivityRequest(id));
            return;
        }

        [Route("start-session/{id}")]
        [HttpGet]
        public async Task StartSession(Guid id)
        {
            await _mediator.Send(new StartActivitySessionRequest(id));
        }

        [Route("end-session/{id}")]
        [HttpGet]
        public async Task EndSession(Guid id)
        {
            await _mediator.Send(new EndActivitySessionRequest(id));
        }
    }
}