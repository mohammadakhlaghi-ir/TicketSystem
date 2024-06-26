using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ticet.Core.Interfaces;
using Ticket.Entity.Models;
using Ticket.Entity;
using Ticet.Core.DTOs;
using Microsoft.EntityFrameworkCore;
using Ticet.Core.Components;

namespace Ticet.Core.Services
{
	public class TicketService : ITicketService
	{
		private readonly Context _context;

		public TicketService(Context context)
		{
			_context = context;
		}

		public async Task CreateTicketAsync(string title, string description, int categoryId, int userId)
		{
			var ticket = new TicketModel
			{
				Title = title,
				UserId = userId,
				CategoryId = categoryId,
				Status = true,
				Messages = new List<Message>
			{
				new Message
				{
					Content = description,
					Timestamp = DateTime.Now,
					UserId = userId
				}
			}
			};

			_context.Tickets.Add(ticket);
			await _context.SaveChangesAsync();
		}
        public async Task<IEnumerable<TicketViewModel>> GetUserTicketsWithDetailsAsync(int userId)
        {
            var tickets = await _context.Tickets
                .Where(t => t.UserId == userId)
                .Select(t => new TicketViewModel
                {
                    Id = t.Id,
                    Title = t.Title,
                    Status = t.Status,
                    LastMessageTimestamp = t.Messages.OrderByDescending(m => m.Timestamp).FirstOrDefault().Timestamp,
                    CategoryName = t.Category.Name
                })
                .ToListAsync();

            return tickets;
        }
        public async Task<bool> CloseTicketAsync(int ticketId)
        {
            var ticket = await _context.Tickets.FindAsync(ticketId);
            if (ticket == null)
            {
                return false;
            }
            ticket.Status = false;
            await _context.SaveChangesAsync();
            return true;
        }
        public IEnumerable<TicketAdminViewModel> GetAllTicketsWithLastMessageTimestamp()
        {
            var tickets = _context.Tickets
                .Select(t => new TicketAdminViewModel
                {
                    TicketId = t.Id,
                    TicketTitle = t.Title,
                    CategoryName = t.Category.Name,
                    Status = t.Status,
                    UserId = t.UserId,
                    LastMessageTimestamp = t.Messages.OrderByDescending(m => m.Timestamp).FirstOrDefault().Timestamp
                })
                .ToList();

            return tickets;
        }
        public PagedResult<TicketAdminViewModel> GetPaginatedTickets(int page, int pageSize)
        {
            var ticketsQuery = _context.Tickets
                .Select(t => new TicketAdminViewModel
                {
                    TicketId = t.Id,
                    TicketTitle = t.Title,
                    CategoryName = t.Category.Name,
                    Status = t.Status,
                    UserId = t.UserId,
                    LastMessageTimestamp = t.Messages.OrderByDescending(m => m.Timestamp).FirstOrDefault().Timestamp
                });

            var totalTickets = ticketsQuery.Count();

            var tickets = ticketsQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedResult<TicketAdminViewModel>
            {
                Items = tickets,
                TotalCount = totalTickets
            };
        }

    }
}
