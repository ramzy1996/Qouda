using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Data.Common;

namespace QoudaApp.Infrastructure.Persistence;

public class DatabaseHealthCheck : IHealthCheck
{
    private readonly DbConnection _connection;

    public DatabaseHealthCheck(DbConnection connection)
    {
        _connection = connection;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            await _connection.OpenAsync(cancellationToken);
            return HealthCheckResult.Healthy("Database connection is healthy");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Database connection failed", ex);
        }
    }
}
