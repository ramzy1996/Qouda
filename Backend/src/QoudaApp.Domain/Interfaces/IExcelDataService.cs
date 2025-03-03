using QoudaApp.Domain.Entities.ExcelData;

namespace QoudaApp.Domain.Interfaces;

public interface IExcelDataService
{
    Task DeleteAllAsync();
    Task BulkInsertAsync(List<ExcelUpload> excelDataList);
    Task<List<ExcelUpload>> GetAllAsync();
}
