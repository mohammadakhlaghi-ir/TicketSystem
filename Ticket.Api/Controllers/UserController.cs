using Microsoft.AspNetCore.Mvc;
using Ticet.Core.DTOs;
using Ticet.Core.Interfaces;
using Ticet.Core.Services;

namespace Ticket.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        public UserController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }
        [HttpPost("createTicket")]
        public async Task<IActionResult> CreateTicket([FromBody] CreateTicketViewModel request)
        {
            if (request == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _ticketService.CreateTicketAsync(request.Title, request.MessageContent, request.CategoryId, request.UserId);
            return Ok(new { Message = "Ticket created successfully" });
        }
    }
}
