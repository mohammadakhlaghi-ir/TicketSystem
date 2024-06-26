using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ticet.Core.Interfaces
{
	public interface ITicketService
	{
		Task CreateTicketAsync(string title, string description, int categoryId, int userId);
	}
}
