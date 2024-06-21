using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ticet.Core.DTOs
{
    public class CategoryCreateModel
    {
        [Required(ErrorMessage = "Category Name is required.")]
        public string CategoryName { get; set; }
    }
}
