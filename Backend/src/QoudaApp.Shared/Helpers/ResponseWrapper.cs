namespace QoudaApp.Shared.Helpers;

public class ResponseWrapper<T>
{
    public T Data { get; set; }
    public bool Success { get; set; }
    public string Message { get; set; }
    public DateTime Timestamp { get; set; }

    public ResponseWrapper(T data, bool success = true, string message = null)
    {
        Data = data;
        Success = success;
        Message = message ?? (success ? "Operation completed successfully" : "Operation failed");
        Timestamp = DateTime.UtcNow;
    }
}
