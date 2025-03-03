using System.Net;

namespace QoudaApp.Shared.Exceptions;

public class ForbiddenException(string message) : CustomException(message, [], HttpStatusCode.Forbidden)
{
}