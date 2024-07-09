using Microsoft.AspNetCore.Mvc;
using Ticet.Core.DTOs;
using Ticet.Core.Interfaces;

namespace Ticket.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IUserService _userService;
        public AccountController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost]
        public IActionResult Login([FromBody] LoginViewModel loginModel)
        {
            if (loginModel == null || string.IsNullOrEmpty(loginModel.Name) || string.IsNullOrEmpty(loginModel.Password))
            {
                return BadRequest("Invalid client request");
            }

            var user = _userService.Authenticate(loginModel.Name, loginModel.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(new { RoleName = user.RoleName });
        }
    }
}
