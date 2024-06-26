using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ticet.Core.DTOs
{
    public class TicketViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Status { get; set; }
        public DateTime LastMessageTimestamp { get; set; }
        public string CategoryName { get; set; }
    }
    public class TicketAdminViewModel
    {
        public int TicketId { get; set; }
        public string TicketTitle { get; set; }
        public string CategoryName { get; set; }
        public bool Status { get; set; }
        public int UserId { get; set; }
        public DateTime LastMessageTimestamp { get; set; }
    }
}
