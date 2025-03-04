using MediatR;
using QoudaApp.Domain.DTOs;
using QoudaApp.Infrastructure.Services.Common;
using QoudaApp.Shared.Helpers;

namespace QoudaApp.Application.Features.Queries.ExcelData;

public record GetExcelDataQuery(PaginationPayload Payload) : IRequest<PagedList<ExcelDataDto>>;
