using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ticet.Core.Interfaces;
using Ticket.Entity;
using Ticket.Entity.Models;

namespace Ticet.Core.Services
{
    public class UserService : IUserService
    {
        private readonly Context _context;

        public UserService(Context context)
        {
            _context = context;
        }
        public User Authenticate(string name, string password)
        {
            return _context.Users.SingleOrDefault(u => u.Name == name && u.Password == password);

        }
        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
    }
}
