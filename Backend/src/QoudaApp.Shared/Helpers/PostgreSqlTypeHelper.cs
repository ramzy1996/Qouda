namespace QoudaApp.Shared.Helpers;

public class PostgreSqlTypeHelper
{
    public static string GetPostgreSqlType(Type type)
    {
        var typeMap = new Dictionary<Type, string>
    {
        { typeof(Guid), "UUID NOT NULL" },
        { typeof(string), "TEXT" },
        { typeof(int), "INTEGER" },
        { typeof(long), "BIGINT" },
        { typeof(short), "SMALLINT" },
        { typeof(byte), "SMALLINT" },
        { typeof(decimal), "NUMERIC" },
        { typeof(double), "DOUBLE PRECISION" },
        { typeof(float), "REAL" },
        { typeof(bool), "BOOLEAN" },
        { typeof(DateTime), "TIMESTAMP" },
        { typeof(DateTimeOffset), "TIMESTAMPTZ" },
        { typeof(TimeSpan), "INTERVAL" },
        { typeof(byte[]), "BYTEA" },
        { typeof(char), "CHAR" },
        { typeof(char[]), "VARCHAR" }
    };

        if (typeMap.TryGetValue(type, out var postgresType))
        {
            return postgresType;
        }

        if (Nullable.GetUnderlyingType(type) is Type nullableType)
        {
            if (typeMap.TryGetValue(nullableType, out postgresType))
            {
                return postgresType + " NULL";
            }
        }

        return "TEXT"; // Default case
    }
}
