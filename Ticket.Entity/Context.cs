using Microsoft.EntityFrameworkCore;
using Ticket.Entity.Models;

namespace Ticket.Entity
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
      : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-U38GE2Q;Database=TicketDB;Trusted_Connection=True;TrustServerCertificate=True;",
                    options => options.MigrationsAssembly("Ticket.App"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasData(
                new User { ID = 1, Name = "Admin", Password = "123" ,RoleName="Admin" }
            );
        }
    }
}
