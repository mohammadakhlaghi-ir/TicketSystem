using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ticet.Core.Interfaces;
using Ticket.Entity.Models;
using Ticket.Entity;
using Ticet.Core.DTOs;
using Microsoft.EntityFrameworkCore;

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
        public IEnumerable<CategoryViewModel> GetCategoriesWithTicketCount()
        {
            return _context.Categories
                .Select(c => new CategoryViewModel
                {
                    Id = c.Id,
                    Name = c.Name,
                    TicketCount = c.Tickets.Count
                })
                .ToList();
        }
        public Category GetCategoryById(int id)
        {
            return _context.Categories.Include(c => c.Tickets)
                                      .FirstOrDefault(c => c.Id == id);
        }

        public void UpdateCategory(Category category)
        {
            _context.Categories.Update(category);
            _context.SaveChanges();
        }
        public void DeleteCategory(int id)
        {
            var category = _context.Categories.Find(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                _context.SaveChanges();
            }
        }
        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}
