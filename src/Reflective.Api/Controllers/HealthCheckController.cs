using Microsoft.AspNetCore.Mvc;

namespace Reflective.Api.Controllers
{
    [Route("api/health-check")]
    public class HealthCheckController : ApiControllerBase
    {
        [Route("")]
        [HttpGet]
        public IActionResult Check()
        {
            return Ok();
        }
    }
}