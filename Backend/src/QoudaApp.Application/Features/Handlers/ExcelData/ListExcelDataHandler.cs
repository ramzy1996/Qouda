using MediatR;
using Microsoft.Extensions.Logging;
using QoudaApp.Application.Features.Queries.ExcelData;
using QoudaApp.Domain.DTOs;
using QoudaApp.Domain.Interfaces;
using QoudaApp.Infrastructure.Services.Common;

namespace QoudaApp.Application.Features.Handlers.ExcelData;

public sealed class ListExcelDataHandler(IExcelDataService excelService, ILogger<ListExcelDataHandler> logger) :
        IRequestHandler<GetExcelDataQuery, PagedList<ExcelDataDto>>
{
    public async Task<PagedList<ExcelDataDto>> Handle(GetExcelDataQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var data = await excelService.GetAllAsync(request.Payload);

            var response = data.ExcelUploads.Select(excel => new ExcelDataDto
            {
                Id = excel.Id,
                FirstName = excel.FirstName,
                LastName = excel.LastName,
                Email = excel.Email,
                PhoneNumber = excel.PhoneNumber
            }).ToList();
            return new PagedList<ExcelDataDto>(response, request.Payload.PageNumber, request.Payload.PageSize, data.TotalCount);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to fetch excel data");
            throw new Exception("An error occurred while fetching the excel data.", ex);
        }
    }
}
