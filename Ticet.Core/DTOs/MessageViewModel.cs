using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ticet.Core.DTOs
{
    public class MessageViewModel
    {
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public string UserName { get; set; }
        public string RoleName { get; set; } 
    }
    public class AddMessageViewModel
    {
        public string Content { get; set; }
        public int UserId { get; set; }
    }
}
