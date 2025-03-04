using QoudaApp.Domain.Entities.ExcelData;

namespace QoudaApp.Domain.DTOs;

public sealed record ListServiceDto(List<ExcelUpload> ExcelUploads, int TotalCount);
