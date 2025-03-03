using MediatR;
using QoudaApp.Domain.DTOs;

namespace QoudaApp.Application.Features.Queries.ExcelData;

public record GetExcelDataQuery : IRequest<List<ExcelDataDto>>;
