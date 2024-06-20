using Ticket.App;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Ticket.App.Controllers;
using Ticket.Entity;
using Ticet.Core.Interfaces;
using Ticet.Core.Services;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder
                    .ConfigureServices((context, services) =>
                    {
                        services.AddHttpContextAccessor();
                        services.AddMvc();
                        services.AddSession();
                        services.AddAuthorization();
                        services.AddRazorPages();
                        services.AddHttpClient();
                        services.AddControllersWithViews();
                        services.AddDistributedMemoryCache();
                        services.AddAuthentication(options =>
                        {
                            options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                            options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                            options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                        }).AddCookie(options =>
                        {
                            options.Cookie.HttpOnly = true;
                            options.LoginPath = "/Login";
                        });
                        services.AddScoped<HomeController>();
                        services.AddScoped<AccountController>();
                        services.AddDbContext<Context>(options =>
                              options.UseSqlServer(context.Configuration.GetConnectionString("ConnectionString"),
                                  sqlOptions => sqlOptions.MigrationsAssembly("Ticket.App")));
                        services.AddScoped<IUserService, UserService>();
           
                    })
                    .Configure(app =>
                    {
                        app.UseStaticFiles();
                        app.UseRouting();
                        app.UseAuthentication();
                        app.UseAuthorization();
                        app.UseEndpoints(endpoints =>
                        {
                            endpoints.MapControllerRoute(
                                name: "default",
                                pattern: "{controller=Home}/{action=Index}/{id?}");
                        });
                    });
            });
}