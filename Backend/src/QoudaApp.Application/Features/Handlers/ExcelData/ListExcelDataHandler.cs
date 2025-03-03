using MediatR;
using Microsoft.Extensions.Logging;
using QoudaApp.Application.Features.Queries.ExcelData;
using QoudaApp.Domain.DTOs;
using QoudaApp.Domain.Interfaces;

namespace QoudaApp.Application.Features.Handlers.ExcelData;

public sealed class ListExcelDataHandler(IExcelDataService excelService, ILogger<ListExcelDataHandler> logger) :
        IRequestHandler<GetExcelDataQuery, List<ExcelDataDto>>
{
    public async Task<List<ExcelDataDto>> Handle(GetExcelDataQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var excelData = await excelService.GetAllAsync();

            return excelData.Select(excel => new ExcelDataDto
            {
                Id = excel.Id,
                FirstName = excel.FirstName,
                LastName = excel.LastName,
                Email = excel.Email,
                PhoneNumber = excel.PhoneNumber
            }).ToList();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to fetch excel data");
            throw new Exception("An error occurred while fetching the excel data.", ex);
        }
    }
}
