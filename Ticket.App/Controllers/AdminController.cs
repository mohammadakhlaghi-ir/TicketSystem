using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

            // Create a ViewModel and populate it with users
            var viewModel = new ListUsersViewModel
            {
                Users = users
            };

            return View(viewModel); // Pass the viewModel to the view
        }
    }
}
