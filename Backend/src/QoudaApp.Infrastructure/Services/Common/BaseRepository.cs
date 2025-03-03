using Dapper;
using System.Data;
using System.Data.Common;

namespace QoudaApp.Infrastructure.Services.Common;

public abstract class BaseRepository(IDbConnection dbConnection) //IDatabaseHelper databaseHelper
{
    protected async Task<int> ExecuteNonQueryAsync(string sql, object? parameters = null)
    {
        // Used for INSERT, UPDATE, DELETE operations
        return await dbConnection.ExecuteAsync(sql, parameters);
    }

    protected async Task<T> ExecuteScalarQueryAsync<T>(string sql, object? parameters = null)
    {
        // Used for scalar queries (COUNT, SUM, MAX, MIN, AVG)
        var result = await dbConnection.ExecuteScalarAsync<T>(sql, parameters);
        return result!;
    }

    protected async Task<List<T>> QueryAsync<T>(string sql, object? parameters = null)
    {
        var result = await dbConnection.QueryAsync<T>(sql, parameters);
        return result.ToList();
    }

    protected async Task<T?> QueryFirstOrDefaultAsync<T>(string sql, object? parameters = null)
    {
        return await dbConnection.QueryFirstOrDefaultAsync<T>(sql, parameters);
    }

    protected async Task ExecuteReaderAsync(string sql, object? parameters, Func<IDataReader, Task> handleRowAsync)
    {
        // Execute a query and process rows manually using a callback function
        using var reader = await dbConnection.ExecuteReaderAsync(sql, parameters) as DbDataReader;
        while (await reader!.ReadAsync())
        {
            await handleRowAsync(reader);
        }
    }

    //protected async Task<TResult> ExecuteTransactionAsync<TResult>(Func<IDbConnection, IDbTransaction, Task<TResult>> transactionBody)
    //{
    //    using var connection = await databaseHelper.GetOpenConnectionAsync();
    //    using var transaction = await databaseHelper.BeginTransactionAsync();

    //    try
    //    {
    //        var result = await transactionBody(connection, transaction);
    //        transaction.Commit();
    //        return result;
    //    }
    //    catch
    //    {
    //        transaction.Rollback();
    //        throw;
    //    }
    //}

    // Simpler version for boolean results (success/failure)
    //protected async Task<bool> ExecuteTransactionAsync(Func<IDbConnection, IDbTransaction, Task<bool>> transactionBody)
    //{
    //    using var connection = await databaseHelper.GetOpenConnectionAsync();
    //    using var transaction = await databaseHelper.BeginTransactionAsync();

    //    try
    //    {
    //        var success = await transactionBody(connection, transaction);

    //        if (success)
    //        {
    //            transaction.Commit();
    //            return true;
    //        }
    //        else
    //        {
    //            transaction.Rollback();
    //            return false;
    //        }
    //    }
    //    catch
    //    {
    //        transaction.Rollback();
    //        throw;
    //    }
    //}
}
