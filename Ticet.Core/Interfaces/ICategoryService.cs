using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ticet.Core.DTOs;
using Ticket.Entity.Models;

namespace Ticet.Core.Interfaces
{
    public interface ICategoryService
    {
        Task<Category> CreateCategoryAsync(string categoryName);
        IEnumerable<CategoryViewModel> GetCategoriesWithTicketCount();
        Category GetCategoryById(int id);
        void UpdateCategory(Category category);
        void DeleteCategory(int id);

    }
}
