using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ticket.Entity.Models;

namespace Ticet.Core.Interfaces
{
    public interface IUserService
    {
        User Authenticate(string name, string password);
        Task AddUserAsync(User user);
        List<User> GetAllUsers();
        void DeleteUser(int id);
        User GetUserById(int id);
        void UpdateUser(User user);
    }
}
