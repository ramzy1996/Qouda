using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Npgsql;
using QoudaApp.Domain.Interfaces.Common;
using QoudaApp.Infrastructure.Configurations;
using System.Data;

namespace QoudaApp.Infrastructure.Persistence;

public class DatabaseHelper(IDbConnection connection, IOptions<DbConfig> dbConfig, ILogger<DatabaseHelper> logger) : IDatabaseHelper
{
    private readonly DbConfig _dbConfig = dbConfig.Value;

    public async Task<IDbConnection> CreateConnectionAsync()
    {
        try
        {
            var connection = new NpgsqlConnection(_dbConfig.GetConnectionString());
            await connection.OpenAsync();
            return connection;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating database connection");
            throw new ApplicationException("Failed to create database connection", ex);
        }
    }

    public async Task<IDbTransaction> BeginTransactionAsync()
    {
        try
        {
            if (connection.State != ConnectionState.Open)
            {
                await (connection as NpgsqlConnection)!.OpenAsync();
            }

            return connection.BeginTransaction();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error beginning transaction");
            throw new ApplicationException("Failed to begin transaction", ex);
        }
    }

    public async Task<IDbConnection> GetOpenConnectionAsync()
    {
        try
        {
            if (connection.State != ConnectionState.Open)
            {
                await (connection as NpgsqlConnection)!.OpenAsync();
            }

            return connection;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error opening connection");
            throw new ApplicationException("Failed to open database connection", ex);
        }
    }
}
