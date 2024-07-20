using Microsoft.EntityFrameworkCore;
using Ticet.Core.Interfaces;
using Ticet.Core.Services;
using Ticket.Api.Controllers;
using Ticket.Entity; // Replace with the actual namespace of your Context and Models

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.json");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<Context>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString"))
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddScoped<AccountController>();
builder.Services.AddScoped<UserController>();
builder.Services.AddScoped<AdminController>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ITicketService, TicketService>();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

// Comment out HTTPS redirection for development
// app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

// Listen on all network interfaces
app.Urls.Add("http://*:7246");

app.Run();
