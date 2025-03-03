using System.Data;

namespace QoudaApp.Domain.Interfaces.Common;

public interface IDatabaseHelper
{
    Task<IDbConnection> CreateConnectionAsync();
    Task<IDbTransaction> BeginTransactionAsync();
    Task<IDbConnection> GetOpenConnectionAsync();
}
