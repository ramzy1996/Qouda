using QoudaApp.Domain.DTOs;
using QoudaApp.Domain.Entities.ExcelData;
using QoudaApp.Shared.Helpers;

namespace QoudaApp.Domain.Interfaces;

public interface IExcelDataService
{
    Task DeleteAllAsync();
    Task BulkInsertAsync(List<ExcelUpload> excelDataList);
    Task<List<ExcelUpload>> GetAllAsync();
    Task<ListServiceDto> GetAllAsync(PaginationPayload payload);
}
