using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Ticet.Core.DTOs;
using Ticet.Core.Interfaces;
using Ticket.Entity.Models;

namespace Ticket.App.Controllers
{
    [Authorize(Policy = "AdminPolicy")]
    public class AdminController : Controller
    {
        private readonly IUserService _userService;

        public AdminController(IUserService userService)
        {
            _userService = userService;
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
    }
}
