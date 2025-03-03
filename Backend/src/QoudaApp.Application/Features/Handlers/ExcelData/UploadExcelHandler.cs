using ClosedXML.Excel;
using CsvHelper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using QoudaApp.Application.Features.Commands.ExcelData;
using QoudaApp.Domain.Entities.ExcelData;
using QoudaApp.Domain.Interfaces;
using QoudaApp.Domain.Mapper;
using QoudaApp.Shared.Exceptions;
using QoudaApp.Shared.Helpers;
using System.Globalization;

namespace QoudaApp.Application.Features.Handlers.ExcelData;

public sealed class UploadExcelHandler(IExcelDataService excelService, ILogger<UploadExcelHandler> logger) :
        IRequestHandler<UploadExcelCommand, MessageResponse>
{
    public async Task<MessageResponse> Handle(UploadExcelCommand request, CancellationToken cancellationToken)
    {
        try
        {
            if (request.File == null || request.File.Length == 0)
                throw new BadRequestException("Invalid file.");

            var fileExtension = Path.GetExtension(request.File.FileName).ToLower();

            if (fileExtension == ".xlsx")  // Handle Excel file
            {
                await ProcessExcelFileAsync(request.File);
            }
            else if (fileExtension == ".csv")  // Handle CSV file
            {
                await ProcessCsvFileAsync(request.File);
            }
            else
            {
                throw new InvalidOperationException("Unsupported file format.");
            }

            return new MessageResponse("Excel uploaded successfully");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to upload excel");
            throw new Exception("An error occurred while uploading the excel.", ex);
        }
    }

    private async Task ProcessExcelFileAsync(IFormFile file)
    {
        using var stream = new MemoryStream();
        await file.CopyToAsync(stream);
        stream.Position = 0;

        using var workbook = new XLWorkbook(stream);
        var worksheet = workbook.Worksheet(1);

        if (worksheet == null)
        {
            throw new InvalidOperationException("Worksheet is null.");
        }

        List<ExcelUpload> excelDataList = new List<ExcelUpload>();

        // Start from the second row to skip the header row
        var lastRow = worksheet.LastRowUsed()?.RowNumber() ?? 0;
        for (int row = 2; row <= lastRow; row++)
        {
            var firstName = worksheet.Cell(row, 1).GetValue<string>();
            var lastName = worksheet.Cell(row, 2).GetValue<string>();
            var email = worksheet.Cell(row, 3).GetValue<string>();
            var phoneNumber = worksheet.Cell(row, 4).GetValue<string>();

            var excelData = ExcelUpload.Create(firstName, lastName, email, phoneNumber);
            excelDataList.Add(excelData);
        }

        await excelService.DeleteAllAsync();
        await excelService.BulkInsertAsync(excelDataList);
    }


    private async Task ProcessCsvFileAsync(IFormFile file)
    {
        using var reader = new StreamReader(file.OpenReadStream());
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

        csv.Context.RegisterClassMap<ExcelDataMap>();

        // Read records, skipping the header automatically
        var records = csv.GetRecords<ExcelUpload>().ToList();

        await excelService.DeleteAllAsync();
        await excelService.BulkInsertAsync(records);
    }
}
