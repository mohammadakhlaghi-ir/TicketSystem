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
        public DbSet<Category> Categories { get; set; }
        public DbSet<TicketModel> Tickets { get; set; }
        public DbSet<Message> Messages { get; set; }
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
                new User { ID = 1, Name = "Admin", Password = "123", RoleName = "Admin" }
            );

            modelBuilder.Entity<TicketModel>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tickets)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Avoid cascade delete

            modelBuilder.Entity<TicketModel>()
                .HasOne(t => t.Category)
                .WithMany(c => c.Tickets)
                .HasForeignKey(t => t.CategoryId)
                .OnDelete(DeleteBehavior.Restrict); // Avoid cascade delete

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Ticket)
                .WithMany(t => t.Messages)
                .HasForeignKey(m => m.TicketId)
                .OnDelete(DeleteBehavior.Restrict); // Avoid cascade delete

            modelBuilder.Entity<Message>()
                .HasOne(m => m.User)
                .WithMany(u => u.Messages)
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Avoid cascade delete
        }
    }
}
