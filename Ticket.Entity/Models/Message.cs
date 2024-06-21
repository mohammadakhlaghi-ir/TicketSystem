using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ticket.Entity.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public int TicketId { get; set; }
        public TicketModel Ticket { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }

}
