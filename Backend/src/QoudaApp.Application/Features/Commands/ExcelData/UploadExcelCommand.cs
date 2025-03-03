using MediatR;
using Microsoft.AspNetCore.Http;
using QoudaApp.Shared.Helpers;

namespace QoudaApp.Application.Features.Commands.ExcelData;

public record UploadExcelCommand(IFormFile File) : IRequest<MessageResponse>;