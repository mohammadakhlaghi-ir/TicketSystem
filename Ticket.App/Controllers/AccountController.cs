using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ticet.Core.Interfaces;

namespace Ticket.App.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }
        [Route("Dashboard")]
        [Authorize]
        public IActionResult Dashboard()
        {
            return View();
        }
        [Route("Login")]
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [Route("Login")]
        public IActionResult Login(string name, string password)
        {
            var user = _userService.Authenticate(name, password);

            if (user == null)
            {
                ModelState.AddModelError("", "Invalid username or password");
                return View();
            }

            // Assuming you have some session management
            HttpContext.Session.SetString("UserName", user.Name);
            HttpContext.Session.SetString("RoleName", user.RoleName);

            return RedirectToAction("Dashboard", "Account");
        }
    }
}
