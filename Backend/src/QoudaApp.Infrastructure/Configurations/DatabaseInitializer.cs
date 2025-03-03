using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Npgsql;
using QoudaApp.Domain.Entities.Common;
using QoudaApp.Domain.Interfaces.Common;
using QoudaApp.Infrastructure.Persistence;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace QoudaApp.Infrastructure.Configurations;

public class DatabaseInitializer(
        IOptions<DbConfig> dbConfig,
        TableCreator tableCreator,
        ILogger<DatabaseInitializer> logger) : IDatabaseInitializer
{
    private readonly DbConfig _dbConfig = dbConfig.Value;
    public async Task InitializeDatabaseAsync()
    {
        try
        {
            logger.LogInformation("Checking if database '{Database}' exists...", _dbConfig.Database);

            // Create a connection string to the 'postgres' database (default database)
            var masterConnectionString = _dbConfig.GetMasterConnectionString();

            // Check if database exists
            var databaseExists = await CheckDatabaseExistsAsync(masterConnectionString);

            if (!databaseExists)
            {
                logger.LogInformation("Database '{Database}' does not exist. Creating...", _dbConfig.Database);
                await CreateDatabaseAsync(masterConnectionString);
                logger.LogInformation("Database '{Database}' created successfully.", _dbConfig.Database);
            }

            // Initialize database schema if needed
            await InitializeDatabaseSchemaAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error initializing database '{Database}'", _dbConfig.Database);
            throw new ApplicationException($"Failed to initialize database '{_dbConfig.Database}'", ex);
        }
    }

    private async Task<bool> CheckDatabaseExistsAsync(string connectionString)
    {
        using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync();

        // Check if the database exists
        var sql = "SELECT 1 FROM pg_database WHERE datname = @databaseName";
        using var command = new NpgsqlCommand(sql, connection);
        command.Parameters.AddWithValue("databaseName", _dbConfig.Database);

        var result = await command.ExecuteScalarAsync();
        return result != null;
    }

    private async Task CreateDatabaseAsync(string connectionString)
    {
        using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync();

        // Create the database
        var escapedDbName = _dbConfig.Database.Replace("'", "''");
        var sql = $"CREATE DATABASE \"{escapedDbName}\" ENCODING = 'UTF8'";

        using var command = new NpgsqlCommand(sql, connection);
        await command.ExecuteNonQueryAsync();
    }

    public async Task InitializeDatabaseSchemaAsync()
    {
        // Load the QoudaApp.Domain assembly explicitly
        var domainAssembly = Assembly.Load("QoudaApp.Domain");

        // Get entity types that inherit from BaseEntity<TId>
        var entityTypes = domainAssembly.GetTypes()
            .Where(t => t.IsClass &&
                        !t.IsAbstract &&
                        t.BaseType != null &&
                        t.BaseType.IsGenericType &&
                        t.BaseType.GetGenericTypeDefinition() == typeof(BaseEntity<>) &&
                        t.GetCustomAttribute<NotMappedAttribute>() == null) // Skip [NotMapped] entities
            .ToList();

        await tableCreator.InitializeTablesAsync(entityTypes);
    }
}
