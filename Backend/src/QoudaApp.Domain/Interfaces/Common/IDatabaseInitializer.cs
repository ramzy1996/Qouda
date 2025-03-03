namespace QoudaApp.Domain.Interfaces.Common;

public interface IDatabaseInitializer
{
    Task InitializeDatabaseAsync();
}