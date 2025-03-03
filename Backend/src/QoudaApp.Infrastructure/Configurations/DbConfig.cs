using Npgsql;

namespace QoudaApp.Infrastructure.Configurations;

public class DbConfig
{
    public string Host { get; set; } = string.Empty;
    public int Port { get; set; } = 5432;
    public string Database { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public int ConnectionTimeout { get; set; } = 15;
    public int CommandTimeout { get; set; } = 30;
    public int MinPoolSize { get; set; } = 1;
    public int MaxPoolSize { get; set; } = 100;
    public bool Pooling { get; set; } = true;
    public bool SSL { get; set; } = true;

    public string GetConnectionString()
    {
        var builder = new NpgsqlConnectionStringBuilder
        {
            Host = Host,
            Port = Port,
            Database = Database,
            Username = Username,
            Password = Password,
            SslMode = SslMode.Require,
            TrustServerCertificate = SSL
        };

        return builder.ToString();
    }

    public string GetMasterConnectionString()
    {
        var builder = new NpgsqlConnectionStringBuilder
        {
            Host = Host,
            Port = Port,
            Database = "postgres", // Default system database for creating other databases
            Username = Username,
            Password = Password,
            SslMode = SslMode.Require,
            TrustServerCertificate = SSL
        };

        return builder.ToString();
    }
}
