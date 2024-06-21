using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Ticet.Core.DTOs;
using Ticet.Core.Interfaces;
using Ticet.Core.Services;
using Ticket.Entity.Models;

namespace Ticket.App.Controllers
{
    [Authorize(Policy = "AdminPolicy")]
    public class AdminController : Controller
    {
        private readonly IUserService _userService;
        private readonly ICategoryService _categoryService;
        public AdminController(IUserService userService, ICategoryService categoryService)
        {
            _userService = userService;
            _categoryService = categoryService;
        }
        [Route("ListUsers")]
        public IActionResult ListUsers()
        {
            // Get list of users from the UserService
            List<User> users = _userService.GetAllUsers();
            // Get the logged-in user's ID
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Create a ViewModel and populate it with users
            var viewModel = new ListUsersViewModel
            {
                Users = users
            };
            // Pass the logged-in user's ID to the view
            ViewBag.LoggedInUserId = loggedInUserId;
            return View(viewModel); // Pass the viewModel to the view
        }
        [HttpGet("DeleteUser/{id}")]
        public IActionResult DeleteUser(int id)
        {
            // Delete the user using the UserService
            _userService.DeleteUser(id);

            // Redirect to the ListUsers view
            return RedirectToAction("ListUsers");
        }
        [Route("EditUser")]
        public IActionResult EditUser(int id)
        {
            // Get the user by ID from the UserService
            User user = _userService.GetUserById(id);

            // Check if the user exists
            if (user == null)
            {
                return NotFound();
            }

            // Create a ViewModel and populate it with the user data
            var viewModel = new EditUserViewModel
            {
                ID = user.ID,
                Name = user.Name,
                Password = user.Password,
                RoleName = user.RoleName
            };

            return View(viewModel); // Pass the viewModel to the view
        }
        [HttpPost]
        [Route("EditUser")]
        public IActionResult EditUser(EditUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Get the existing user from the database
                User user = _userService.GetUserById(model.ID);

                if (user == null)
                {
                    return NotFound();
                }

                // Update the user details
                user.Name = model.Name;
                user.Password = model.Password;
                user.RoleName = model.RoleName;

                // Save the updated user details
                _userService.UpdateUser(user);

                return RedirectToAction("ListUsers");
            }

            return View(model);
        }
        [Route("CreateCategory")]
        public IActionResult CreateCategory()
        {
            return View();
        }
        [HttpPost]
        [Route("CreateCategory")]
        public async Task<IActionResult> CreateCategory(string categoryName)
        {
            if (string.IsNullOrEmpty(categoryName))
            {
                ModelState.AddModelError("categoryName", "Category Name is required.");
                return View();
            }

            try
            {
                var category = await _categoryService.CreateCategoryAsync(categoryName);
                return RedirectToAction("Dashboard", "Account"); // Redirect to appropriate action after category creation
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while creating the category.");
                return View();
            }
        }
        [Route("ListCategories")]
        public IActionResult ListCategories()
        {
            var categories = _categoryService.GetCategoriesWithTicketCount();
            return View(categories);
        }
    }
}
