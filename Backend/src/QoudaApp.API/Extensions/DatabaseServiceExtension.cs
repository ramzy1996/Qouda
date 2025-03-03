using Microsoft.Extensions.Options;
using Npgsql;
using QoudaApp.Domain.Interfaces.Common;
using QoudaApp.Infrastructure.Configurations;
using QoudaApp.Infrastructure.Persistence;
using System.Data;

namespace QoudaApp.API.Extensions;

public static class DatabaseServiceExtension
{
    public static IServiceCollection AddDatabaseServices(this WebApplicationBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);

        Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;

        // Configure the database connection settings
        builder.Services.Configure<DbConfig>(builder.Configuration.GetSection("DatabaseSettings"));

        // Register IDbConnection for PostgreSQL
        builder.Services.AddTransient<IDbConnection>(sp =>
        {
            var dbConfig = sp.GetRequiredService<IOptions<DbConfig>>().Value;
            return new NpgsqlConnection(dbConfig.GetConnectionString());
        });

        builder.Services.AddSingleton<TableCreator>();
        builder.Services.AddSingleton<IDatabaseInitializer, DatabaseInitializer>();
        builder.Services.AddScoped<IDatabaseHelper, DatabaseHelper>();

        return builder.Services;
    }

    public static async Task<WebApplication> UseDatabaseAsync(this WebApplication app)
    {
        ArgumentNullException.ThrowIfNull(app);

        // Initialize the database
        using (var scope = app.Services.CreateScope())
        {
            var dbInitializer = scope.ServiceProvider.GetRequiredService<IDatabaseInitializer>();
            await dbInitializer.InitializeDatabaseAsync();
        }

        return app;
    }
}

