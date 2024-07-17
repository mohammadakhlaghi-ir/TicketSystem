﻿using Microsoft.AspNetCore.Mvc;
using Ticet.Core.DTOs;
using Ticet.Core.Interfaces;

namespace Ticket.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        public AdminController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet("users")]
        public IActionResult GetAllUsers()
        {
            var users = _userService.GetAllUsers()
                .Select(user => new UserViewModel
                {
                    ID = user.ID,
                    Name = user.Name,
                    RoleName = user.RoleName
                })
                .ToList();

            return Ok(users);
        }
        [HttpPut("update/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UpdateUserViewModel updateUserVM)
        {
            if (updateUserVM == null)
            {
                return BadRequest("Invalid data.");
            }

            var user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (!string.IsNullOrEmpty(updateUserVM.Name))
            {
                user.Name = updateUserVM.Name;
            }

            if (!string.IsNullOrEmpty(updateUserVM.Password))
            {
                user.Password = updateUserVM.Password;
            }

            if (!string.IsNullOrEmpty(updateUserVM.RoleName))
            {
                user.RoleName = updateUserVM.RoleName;
            }

            _userService.UpdateUser(user);

            return Ok("User updated successfully.");
        }
    }
}
