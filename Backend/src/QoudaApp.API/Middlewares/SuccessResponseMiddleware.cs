using QoudaApp.Shared.Helpers;
using System.Text.Json;

namespace QoudaApp.API.Middlewares;

//public class SuccessResponseMiddleware(RequestDelegate next)
//{
//    public async Task InvokeAsync(HttpContext context)
//    {
//        var originalBodyStream = context.Response.Body;
//        using var memoryStream = new MemoryStream();
//        context.Response.Body = memoryStream;

//        // Proceed with the request
//        await next(context);

//        // Only wrap successful responses (2xx status codes)
//        if (context.Response.StatusCode >= 200 && context.Response.StatusCode < 300)
//        {
//            memoryStream.Seek(0, SeekOrigin.Begin);
//            var responseBody = await new StreamReader(memoryStream).ReadToEndAsync();

//            // Deserialize the response body to check if it contains a "message" property
//            object responseData;
//            MessageResponse? message = null;

//            try
//            {
//                // Try to deserialize as JSON first
//                responseData = JsonSerializer.Deserialize<object>(responseBody, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
//            }
//            catch
//            {
//                // If deserialization fails, treat it as raw content (non-JSON)
//                responseData = responseBody;
//            }

//            // If the response is JSON, check for "message" property
//            if (responseData is JsonElement jsonElement && jsonElement.ValueKind == JsonValueKind.Object)
//            {
//                if (jsonElement.TryGetProperty("message", out var messageElement))
//                {
//                    var messageString = messageElement.GetString();
//                    if (!string.IsNullOrEmpty(messageString))
//                    {
//                        message = new MessageResponse(messageString);
//                        responseData = null; // Clear data since message was already set
//                    }
//                }
//            }

//            // Wrap the response with data and message
//            var wrappedResponse = new ResponseWrapper<object>(
//                responseData,
//                success: true,
//                message: message?.Message
//            );

//            // Serialize the wrapped response
//            var wrappedJson = JsonSerializer.Serialize(wrappedResponse, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });

//            // Reset the response body stream
//            context.Response.Body = originalBodyStream;
//            context.Response.ContentType = "application/json";
//            await context.Response.WriteAsync(wrappedJson);
//        }
//        else
//        {
//            // For non-success status codes, just copy the original response body
//            memoryStream.Seek(0, SeekOrigin.Begin);
//            await memoryStream.CopyToAsync(originalBodyStream);
//        }
//    }
//}

public class SuccessResponseMiddleware
{
    private readonly RequestDelegate _next;
    private static readonly JsonSerializerOptions JsonSerializerOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

    public SuccessResponseMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var originalBodyStream = context.Response.Body;
        using var memoryStream = new MemoryStream();
        context.Response.Body = memoryStream;

        try
        {
            // Proceed with the request
            await _next(context);

            // Check if the response is a file or binary data
            if (context.Response.ContentType != null && context.Response.ContentType.StartsWith("application/json", StringComparison.OrdinalIgnoreCase))
            {
                // Only wrap JSON responses
                memoryStream.Seek(0, SeekOrigin.Begin);
                var responseBody = await new StreamReader(memoryStream).ReadToEndAsync();

                // Deserialize the response body
                object? responseData;
                try
                {
                    responseData = JsonSerializer.Deserialize<object>(responseBody, JsonSerializerOptions);
                }
                catch (JsonException ex)
                {
                    // If deserialization fails, log the error and return the original response
                    Console.WriteLine($"Error deserializing response: {ex.Message}");
                    memoryStream.Seek(0, SeekOrigin.Begin);
                    await memoryStream.CopyToAsync(originalBodyStream);
                    return;
                }

                // Wrap the response with data and message
                var wrappedResponse = new ResponseWrapper<object>(
                    responseData ?? new object(), // Ensure responseData is not null
                    success: context.Response.StatusCode >= 200 && context.Response.StatusCode < 300,
                    message: GetMessageFromResponse(responseData) ?? string.Empty // Ensure message is not null
                );

                // Serialize the wrapped response
                var wrappedJson = JsonSerializer.Serialize(wrappedResponse, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });

                // Reset the response body stream
                context.Response.Body = originalBodyStream;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(wrappedJson);
            }
            else
            {
                // For non-JSON responses, just copy the original response body
                memoryStream.Seek(0, SeekOrigin.Begin);
                await memoryStream.CopyToAsync(originalBodyStream);
            }
        }
        catch (Exception ex)
        {
            // Log any errors that occur during the middleware execution
            Console.WriteLine($"Error in middleware: {ex.Message}");
            throw;
        }
        finally
        {
            // Ensure the response body stream is reset
            context.Response.Body = originalBodyStream;
        }
    }

    private string? GetMessageFromResponse(object? responseData)
    {
        // Check if the response data contains a "message" property
        if (responseData is JsonElement jsonElement && jsonElement.ValueKind == JsonValueKind.Object)
        {
            if (jsonElement.TryGetProperty("message", out var messageElement))
            {
                return messageElement.GetString();
            }
        }
        return null;
    }
}
