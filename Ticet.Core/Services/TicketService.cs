﻿using System;
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
        public async Task<PagedResult<TicketViewModel>> GetUserTicketsWithDetailsAsync(int userId, int page, int pageSize)
        {
            var query = _context.Tickets
                .Where(t => t.UserId == userId)
                .Select(t => new TicketViewModel
                {
                    Id = t.Id,
                    Title = t.Title,
                    Status = t.Status,
                    LastMessageTimestamp = t.Messages.OrderByDescending(m => m.Timestamp).FirstOrDefault().Timestamp,
                    CategoryName = t.Category.Name
                }).OrderByDescending(t => t.LastMessageTimestamp); // Order by LastMessageTimestamp in descending order

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<TicketViewModel>
            {
                Items = items,
                TotalCount = totalCount
            };
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
                .ToList().OrderByDescending(t => t.LastMessageTimestamp); // Order by LastMessageTimestamp in descending order;

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
                .ToList().OrderByDescending(t => t.LastMessageTimestamp); // Order by LastMessageTimestamp in descending order;

            return new PagedResult<TicketAdminViewModel>
            {
                Items = tickets,
                TotalCount = totalTickets
            };

        }
        public async Task<MyTicketViewModel> GetTicketWithDetailsAsync(int ticketId)
        {
            var ticket = await _context.Tickets
                .Include(t => t.Category)
                .Include(t => t.Messages)
                    .ThenInclude(m => m.User)
                .Where(t => t.Id == ticketId)
                .Select(t => new MyTicketViewModel
                {
                    Id = t.Id,
                    Title = t.Title,
                    CategoryName = t.Category.Name,
                    Status = t.Status,
                    UserId = t.UserId,
                    Messages = t.Messages.OrderBy(m => m.Timestamp).Select(m => new MessageViewModel
                    {
                        Content = m.Content,
                        Timestamp = m.Timestamp,
                        UserName = m.User.Name,
                        RoleName = m.User.RoleName, 

                    }).ToList()
                })
                .FirstOrDefaultAsync();

            return ticket;
        }
        public async Task<bool> AddMessageToTicketAsync(int ticketId, int userId, string content)
        {
            var ticket = await _context.Tickets.FindAsync(ticketId);

            if (ticket == null)
            {
                Console.WriteLine("Ticket not found.");
                return false;
            }

            if (ticket.UserId != userId)
            {
                Console.WriteLine($"Unauthorized access. Ticket.UserId: {ticket.UserId}, UserId: {userId}");
                return false;
            }

            var message = new Message
            {
                Content = content,
                Timestamp = DateTime.Now,
                TicketId = ticketId,
                UserId = userId
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CloseTicketAsync(int ticketId, int userId)
        {
            var ticket = await _context.Tickets.FindAsync(ticketId);

            if (ticket == null || ticket.UserId != userId)
            {
                return false;
            }

            ticket.Status = false;
            await _context.SaveChangesAsync();
            return true;
        }
        public AdminTicketViewModel GetTicketById(int ticketId)
        {
            // Fetch the ticket from the database
            var ticket = _context.Tickets
                                 .Include(t => t.Category)
                                 .Include(t => t.Messages)
                                 .ThenInclude(m => m.User)
                                 .FirstOrDefault(t => t.Id == ticketId);

            if (ticket == null)
            {
                // Handle the case where the ticket is not found
                return null;
            }

            // Map the TicketModel to AdminTicketViewModel
            var ticketViewModel = new AdminTicketViewModel
            {
                Id = ticket.Id,
                Title = ticket.Title,
                CategoryName = ticket.Category.Name,
                Status = ticket.Status,
                Messages = ticket.Messages.Select(m => new MessageViewModel
                {
                    Content = m.Content,
                    Timestamp = m.Timestamp,
                    UserName = m.User.Name,
                    RoleName = m.User.RoleName // Map this property

                }).ToList()
            };

            return ticketViewModel;
        }
        public void UpdateTicket(AdminTicketViewModel ticket)
        {
            var existingTicket = _context.Tickets.Find(ticket.Id);
            if (existingTicket != null)
            {
                existingTicket.Status = ticket.Status;
                _context.SaveChanges();
            }
        }
        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
            _context.SaveChanges();
        }
        public void ChangeTicketStatusToFalse(int ticketId)
        {
            var ticket = _context.Tickets.FirstOrDefault(t => t.Id == ticketId);
            if (ticket != null)
            {
                ticket.Status = false;
                _context.SaveChanges();
            }
        }
        public AdminTicketViewModel GetTicketMessagesById(int ticketId)
        {
            // Fetch the ticket from the database
            var ticket = _context.Tickets
                                 .Include(t => t.Category)
                                 .Include(t => t.Messages)
                                 .ThenInclude(m => m.User)
                                 .FirstOrDefault(t => t.Id == ticketId);

            if (ticket == null)
            {
                // Handle the case where the ticket is not found
                return null;
            }

            // Map the TicketModel to TicketMessagesViewModel
            var ticketMessagesViewModel = new AdminTicketViewModel
            {
                Id = ticket.Id,
                Title = ticket.Title,
                Status = ticket.Status,
                CategoryName = ticket.Category.Name,
                Messages = ticket.Messages.Select(m => new MessageViewModel
                {
                    Content = m.Content,
                    Timestamp = m.Timestamp,
                    UserName = m.User.Name,
                    RoleName = m.User.RoleName
                }).ToList()
            };

            return ticketMessagesViewModel;
        }
    }
}
