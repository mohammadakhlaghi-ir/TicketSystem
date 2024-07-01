using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ticet.Core.Components;
using Ticet.Core.DTOs;
using Ticket.Entity.Models;

namespace Ticet.Core.Interfaces
{
	public interface ITicketService
	{
		Task CreateTicketAsync(string title, string description, int categoryId, int userId);
        Task<PagedResult<TicketViewModel>> GetUserTicketsWithDetailsAsync(int userId, int page, int pageSize);
        Task<bool> CloseTicketAsync(int ticketId);
        IEnumerable<TicketAdminViewModel> GetAllTicketsWithLastMessageTimestamp();
        PagedResult<TicketAdminViewModel> GetPaginatedTickets(int page, int pageSize);
        Task<MyTicketViewModel> GetTicketWithDetailsAsync(int ticketId);
        Task<bool> AddMessageToTicketAsync(int ticketId, int userId, string content);
        Task<bool> CloseTicketAsync(int ticketId, int userId);
        AdminTicketViewModel GetTicketById(int ticketId);
    }
}
