﻿using System.Security.Claims;
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
        public async Task<IActionResult> MyTickets()
        {
            string roleName = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            ViewBag.RoleName = roleName;

            int userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
            var tickets = await _ticketService.GetUserTicketsWithDetailsAsync(userId);

            return View(tickets);
        }
    }
}
