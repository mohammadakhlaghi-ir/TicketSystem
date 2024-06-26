using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ticet.Core.Interfaces;
using Ticket.Entity.Models;
using Ticket.Entity;

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
	}

}
