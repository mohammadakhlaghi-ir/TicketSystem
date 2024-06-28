using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ticet.Core.Interfaces;

namespace Ticket.App.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
		private readonly ITicketService _ticketService;
		private readonly ICategoryService _categoryService;
		public UserController(ITicketService ticketService,ICategoryService categoryService)
		{
			_ticketService = ticketService;
			_categoryService = categoryService;
		}
		[Route("CreateTicket")]
        public async Task<IActionResult> CreateTicket()
        {
            string roleName = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            ViewBag.RoleName = roleName; // Pass roleName to the view
                                         // Load categories from the database
            ViewBag.Categories = await _categoryService.GetCategoriesAsync();

            return View();
        }
		[HttpPost]
		[Route("CreateTicket")]
		public async Task<IActionResult> CreateTicket(string Title, string Description, int CategoryId)
		{
			string roleName = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
			if (roleName != "User")
			{
				return RedirectToAction("AccessDenied", "Account");
			}

			int userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

			await _ticketService.CreateTicketAsync(Title, Description, CategoryId, userId);
            TempData["SuccessMessage"] = "Your Ticket is created";

            return RedirectToAction("Dashboard","Account");
		}
        [Route("MyTickets")]
        public async Task<IActionResult> MyTickets(int page = 1, int pageSize = 10)
        {
            string roleName = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            ViewBag.RoleName = roleName;

            int userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
            var pagedResult = await _ticketService.GetUserTicketsWithDetailsAsync(userId, page, pageSize);

            ViewBag.Page = page;
            ViewBag.PageSize = pageSize;
            ViewBag.TotalCount = pagedResult.TotalCount;

            return View(pagedResult.Items);
        }

        [HttpPost]
        public async Task<IActionResult> CloseTicket(int ticketId)
        {
            bool success = await _ticketService.CloseTicketAsync(ticketId);
            if (success)
            {
                return Ok();
            }
            return BadRequest();
        }
        [Route("MyTicket")]
        public async Task<IActionResult> MyTicket(int ticketId)
        {
            ViewData["HideFooter"] = true;

            // Get the logged-in user's ID
            int userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

            // Retrieve the ticket details along with the related messages
            var ticket = await _ticketService.GetTicketWithDetailsAsync(ticketId);

            // Check if the logged-in user is the owner of the ticket
            if (ticket == null || ticket.UserId != userId)
            {
                return Unauthorized(); // Or you can return a view that indicates lack of permission
            }

            // Pass the ticket details to the view
            return View(ticket);
        }


    }
}
