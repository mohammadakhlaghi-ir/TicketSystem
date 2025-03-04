﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ticket.Entity.Models;

namespace Ticet.Core.DTOs
{
    public class ListUsersViewModel
    {
        public List<User> Users { get; set; }
    }
    public class UserViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string RoleName { get; set; }
    }
}
