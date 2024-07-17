using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ticet.Core.DTOs
{
    public class EditUserViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string RoleName { get; set; }
    }
    public class UpdateUserViewModel
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string RoleName { get; set; }
    }
}
