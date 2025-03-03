using Dapper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Npgsql;
using QoudaApp.Infrastructure.Configurations;
using QoudaApp.Shared.Helpers;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using System.Text;

namespace QoudaApp.Infrastructure.Persistence;

public class TableCreator(IOptions<DbConfig> dbConfig, ILogger<TableCreator> logger)
{
    private readonly DbConfig _dbConfig = dbConfig.Value;

    public async Task InitializeTablesAsync(IEnumerable<Type> entityTypes)
    {
        try
        {
            using var connection = new NpgsqlConnection(_dbConfig.GetConnectionString());
            await connection.OpenAsync();

            foreach (var type in entityTypes)
            {
                var createTableSql = GenerateCreateTableSql(type);
                if (!string.IsNullOrEmpty(createTableSql))
                {
                    logger.LogInformation($"Creating table for entity: {type.Name}");
                    await connection.ExecuteAsync(createTableSql);
                }
            }

            logger.LogInformation("All tables initialized successfully.");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error while initializing tables");
            throw;
        }
    }

    private static string GenerateCreateTableSql(Type type)
    {
        var tableName = StringConvertionHelper.ConvertToSnakeCase(type.Name);
        var properties = type.GetProperties()
         .Where(p => p.GetCustomAttribute<NotMappedAttribute>() == null) // Exclude [NotMapped] properties
         .ToList();

        var columns = new List<string>();
        string primaryKey = null;

        foreach (var prop in properties)
        {
            var columnName = StringConvertionHelper.ConvertToSnakeCase(prop.Name);
            var columnType = PostgreSqlTypeHelper.GetPostgreSqlType(prop.PropertyType);

            if (prop.Name == "Id" && prop.PropertyType == typeof(Guid))
            {
                primaryKey = columnName;
                columns.Add($"{columnName} {columnType} PRIMARY KEY");
            }
            else
            {
                columns.Add($"{columnName} {columnType}");
            }
        }

        if (!columns.Any()) return string.Empty;

        var sql = new StringBuilder();
        sql.AppendLine($"CREATE TABLE IF NOT EXISTS {tableName} (");
        sql.AppendLine(string.Join(",\n", columns));
        sql.AppendLine(");");

        return sql.ToString();
    }
}
