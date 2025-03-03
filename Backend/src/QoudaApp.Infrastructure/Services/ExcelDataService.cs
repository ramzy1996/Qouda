using QoudaApp.Domain.Entities.ExcelData;
using QoudaApp.Domain.Interfaces;
using QoudaApp.Infrastructure.Services.Common;
using System.Data;

namespace QoudaApp.Infrastructure.Services;

public class ExcelDataService(IDbConnection dbConnection) : BaseRepository(dbConnection), IExcelDataService
{
    public async Task DeleteAllAsync()
    {
        const string sql = "DELETE FROM excel_upload";
        await ExecuteNonQueryAsync(sql);
    }

    public async Task BulkInsertAsync(List<ExcelUpload> excelDataList)
    {
        const string sql = "INSERT INTO excel_upload (id, first_name, last_name, email, phone_number, created_date) " +
                           "VALUES (@Id, @FirstName, @LastName, @Email, @PhoneNumber,@CreatedDate)";

        await ExecuteNonQueryAsync(sql, excelDataList);
    }

    public async Task<List<ExcelUpload>> GetAllAsync()
    {
        const string sql = "SELECT * FROM excel_upload";
        return await QueryAsync<ExcelUpload>(sql);
    }
}
