using System.Net;

namespace QoudaApp.Shared.Exceptions;

public class NotFoundException(string message) : CustomException(message, [], HttpStatusCode.NotFound)
{
}