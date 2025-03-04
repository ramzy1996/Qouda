namespace QoudaApp.API.Extensions;

public static class CoreExtension
{
    public static IServiceCollection AddCoreServices(this WebApplicationBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowQoudaOrigins", builder =>
            {
                builder.WithOrigins("http://localhost:5173")
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });

        return builder.Services;
    }
}
