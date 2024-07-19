using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;
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
        [HttpPut("UpdateCategory/{id}")]
        public IActionResult UpdateCategory(int id, [FromBody] CategoryCreateModel categoryUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = _categoryService.GetCategoryById(id);
            if (category == null)
            {
                return NotFound($"Category with ID {id} not found.");
            }

            category.Name = categoryUpdateDto.CategoryName;

            try
            {
                _categoryService.UpdateCategory(category);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }

            return NoContent(); // 204 No Content
        }
        [HttpGet("categories/{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _categoryService.GetCategoryById(id);

            if (category == null)
            {
                return NotFound(); // Return 404 Not Found if category with given id is not found
            }

            var categoryInfo = new
            {
                CategoryId = category.Id,
                CategoryName = category.Name,
                Tickets = category.Tickets.Select(t => new
                {
                    TicketId = t.Id,
                    TicketTitle = t.Title,
                    Status = t.Status
                })
            };

            return Ok(categoryInfo); // Return 200 OK with category info
        }
        [HttpPost("create-category")]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryCreateModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = await _categoryService.CreateCategoryAsync(model.CategoryName);
            if (category == null)
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            return Ok(category);
        }
        [HttpDelete("delete-category/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _categoryService.GetCategoryById(id); // Implement GetCategoryById if not exists
            if (category == null)
            {
                return NotFound($"Category with ID {id} not found.");
            }

            _categoryService.DeleteCategory(id);
            return NoContent(); // 204 No Content
        }
    }
}
