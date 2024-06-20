using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ticket.App.Controllers
{
    [Authorize(Policy = "AdminPolicy")]
    public class AdminController : Controller
    {
        [Route("ListUsers")]
        public IActionResult ListUsers()
        {
            return View();
        }
    }
}
