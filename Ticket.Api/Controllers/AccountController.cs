using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Ticet.Core.DTOs;
using Ticet.Core.Interfaces;
using Ticket.Entity.Models;

namespace Ticket.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;
        public AccountController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginViewModel model)
        {
            var user = _userService.Authenticate(model.Name, model.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            // Authentication successful
            return Ok(new {
                UserId = user.ID, // Ensure you include UserId if available
                RoleName = user.RoleName, Token = "user-specific-token" });
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                Name = model.Name,
                Password = model.Password,
                RoleName = "User"
            };

            await _userService.AddUserAsync(user);

            return Ok(new { message = "User registered successfully" });
        }
        [HttpPut("update/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] EditAccountViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _userService.GetUserById(id); // Assuming this method exists in IUserService

            if (user == null)
            {
                return NotFound("User not found");
            }

            user.Name = model.Name;
            user.Password = model.Password;

            try
            {
                _userService.UpdateUser(user); // Use the existing method to update the user
                return Ok("User updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
