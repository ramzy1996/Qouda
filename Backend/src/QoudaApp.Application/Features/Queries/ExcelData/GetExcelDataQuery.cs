using MediatR;
using QoudaApp.Domain.DTOs;
using QoudaApp.Infrastructure.Services.Common;

namespace QoudaApp.Application.Features.Queries.ExcelData;

public record GetExcelDataQuery : IRequest<PagedList<ExcelDataDto>>;
