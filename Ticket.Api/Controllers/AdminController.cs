﻿using Microsoft.AspNetCore.Mvc;
using Ticet.Core.DTOs;
using Ticet.Core.Interfaces;
using Ticet.Core.Services;

namespace Ticket.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ICategoryService _categoryService;
        public AdminController(IUserService userService, ICategoryService categoryService)
        {
            _userService = userService;
            _categoryService = categoryService;
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
        [HttpGet("users/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
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
        [HttpDelete("userDelete/{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                _userService.DeleteUser(id);
                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("categories")]
        public IActionResult GetCategoriesWithTicketCount()
        {
            try
            {
                var categories = _categoryService.GetCategoriesWithTicketCount();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
