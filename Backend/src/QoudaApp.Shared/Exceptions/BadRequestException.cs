using System.Net;

namespace QoudaApp.Shared.Exceptions;

public class BadRequestException(string message) : CustomException(message, [], HttpStatusCode.BadRequest)
{
}