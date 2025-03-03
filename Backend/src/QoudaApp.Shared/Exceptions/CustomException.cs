using System.Net;

namespace QoudaApp.Shared.Exceptions;

public class CustomException : Exception
{
    public IEnumerable<string> ErrorMessages { get; protected set; }

    public HttpStatusCode StatusCode { get; protected set; }

    public CustomException(string message, IEnumerable<string> errors, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
        : base(message)
    {
        ErrorMessages = errors;
        StatusCode = statusCode;
    }

    public CustomException(string message) : base(message)
    {
        ErrorMessages = [];
    }
}