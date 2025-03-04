using QoudaApp.Domain.DTOs;
using QoudaApp.Domain.Entities.ExcelData;
using QoudaApp.Domain.Interfaces;
using QoudaApp.Infrastructure.Services.Common;
using QoudaApp.Shared.Helpers;
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

    public async Task<ListServiceDto> GetAllAsync(PaginationPayload payload)
    {
        //const string sql = "SELECT * FROM excel_upload";
        var sql = @"
            SELECT *
            FROM excel_upload
            WHERE (@SearchBy IS NULL OR (first_name ILIKE '%' || @SearchBy || '%' OR last_name ILIKE '%' || @SearchBy || '%'))
            ORDER BY 
                CASE WHEN @SortBy = 'first_name' AND @SortDirection = 'asc' THEN first_name END ASC,
                CASE WHEN @SortBy = 'first_name' AND @SortDirection = 'desc' THEN first_name END DESC,
                CASE WHEN @SortBy = 'last_name' AND @SortDirection = 'asc' THEN last_name END ASC,
                CASE WHEN @SortBy = 'last_name' AND @SortDirection = 'desc' THEN last_name END DESC,
                CASE WHEN @SortBy = 'email' AND @SortDirection = 'asc' THEN email END ASC,
                CASE WHEN @SortBy = 'email' AND @SortDirection = 'desc' THEN email END DESC,
                CASE WHEN @SortBy = 'phone_number' AND @SortDirection = 'asc' THEN phone_number END ASC,
                CASE WHEN @SortBy = 'phone_number' AND @SortDirection = 'desc' THEN phone_number END DESC
            LIMIT @PageSize OFFSET (@PageNumber - 1) * @PageSize
        ";
        var result = await QueryAsync<ExcelUpload>(sql, new
        {
            payload.PageNumber,
            payload.PageSize,
            payload.SearchBy,
            payload.SortBy,
            payload.SortDirection
        });

        var totalCountSql = @"
                SELECT COUNT(*)
                FROM excel_upload
                WHERE (@SearchBy IS NULL OR (first_name ILIKE '%' || @SearchBy || '%' OR last_name ILIKE '%' || @SearchBy || '%'))
            ";
        var totalCount = await ExecuteScalarQueryAsync<int>(totalCountSql, new { payload.SearchBy });
        return new ListServiceDto(result, totalCount);
    }
}
