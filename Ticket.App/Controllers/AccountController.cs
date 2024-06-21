using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Ticet.Core.Interfaces;
using Ticket.Entity.Models;
using Ticet.Core.DTOs;

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
            string roleName = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            ViewBag.RoleName = roleName; // Pass roleName to the view
            return View();
        }
        [Route("Login")]
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(string name, string password)
        {
            var user = _userService.Authenticate(name, password);

            if (user != null)
            {
                var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()), // Ensure this claim is present
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.RoleName)
            };

                var claimsIdentity = new ClaimsIdentity(
                    claims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    // Configure the authentication properties as needed
                };

                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);

                return RedirectToAction("Dashboard", "Account");
            }

            ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account"); // Redirect to home or another page after logout
        }
        [Route("Register")]
        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Map the view model to your User entity
                var user = new User
                {
                    Name = model.Name,
                    Password = model.Password,
                    RoleName = "User"  // Set RoleName to "User"
                };

                try
                {
                    // Call the UserService to add the user
                    await _userService.AddUserAsync(user);

                    // Optionally, you might redirect to a login page or display a success message
                    return RedirectToAction("Login", "Account"); // Redirect to login page
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", $"Unable to register user: {ex.Message}");
                }
            }

            // If ModelState is not valid or if an exception occurs, return the Register view with errors
            return View(model);
        }
        [Route("Account/AccessDenied")]
        public IActionResult AccessDenied()
        {
            return View();
        }
        [Route("EditAccount")]
        [Authorize]
        public IActionResult EditAccount()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = _userService.GetUserById(int.Parse(userId));
            if (user == null)
            {
                return NotFound();
            }

            var model = new EditAccountViewModel
            {
                Name = user.Name,
                Password = user.Password
            };

            return View(model);
        }
        [HttpPost]
        [Route("EditAccount")]
        [Authorize]
        public IActionResult EditAccount(EditAccountViewModel model)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = _userService.GetUserById(int.Parse(userId));
                if (user == null)
                {
                    return NotFound();
                }

                user.Name = model.Name;
                user.Password = model.Password; // Make sure to hash the password before saving it

                _userService.UpdateUser(user);

                return RedirectToAction("Dashboard");
            }

            return View(model);
        }
    }
}
