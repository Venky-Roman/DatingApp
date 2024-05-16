using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.ApplicationExtensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServiceExtensions(this IServiceCollection Services,IConfiguration config)
        {
            Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("https://localhost:4200")
                                      .AllowAnyMethod()
                                      .AllowAnyHeader());
            });
            
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            Services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DatingAppConnectionString"));
            });
                Services.AddEndpointsApiExplorer();
                Services.AddSwaggerGen();
                Services.AddScoped<ITokenService, TokenService>();

            return Services;
        }
    }
}
