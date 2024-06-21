using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ticet.Core.Interfaces;
using Ticket.Entity.Models;
using Ticket.Entity;

namespace Ticet.Core.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly Context _context;

        public CategoryService(Context context)
        {
            _context = context;
        }

        public async Task<Category> CreateCategoryAsync(string categoryName)
        {
            var category = new Category
            {
                Name = categoryName
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return category;
        }
    }

}
