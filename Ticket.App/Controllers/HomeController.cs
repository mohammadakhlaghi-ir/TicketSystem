using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;


namespace Ticket.App.Controllers
{
    public class HomeController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }


    }
}
