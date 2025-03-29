using ClosedXML.Excel;
using MediatR;
using QoudaApp.Application.Features.Queries.ExcelData;
using QoudaApp.Domain.Interfaces;

namespace QoudaApp.Application.Features.Handlers.ExcelData;

public sealed class DownloadExcelHandler(IExcelDataService excelService) : IRequestHandler<DownloadExcelQuery, Stream>
{
    public async Task<Stream> Handle(DownloadExcelQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var excelData = await excelService.GetAllAsync();

            var stream = new MemoryStream();
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Excel Data");

            worksheet.Cell(1, 1).Value = "FirstName";
            worksheet.Cell(1, 2).Value = "LastName";
            worksheet.Cell(1, 3).Value = "Email";
            worksheet.Cell(1, 4).Value = "PhoneNumber";

            for (int i = 0; i < excelData.Count; i++)
            {
                worksheet.Cell(i + 2, 1).Value = excelData[i].FirstName;
                worksheet.Cell(i + 2, 2).Value = excelData[i].LastName;
                worksheet.Cell(i + 2, 3).Value = excelData[i].Email;
                worksheet.Cell(i + 2, 4).Value = excelData[i].PhoneNumber;
            }

            workbook.SaveAs(stream);
            stream.Position = 0;

            return stream;
        }
        catch (Exception ex)
        {
            throw new Exception("An error occurred while downloading the Excel file.", ex);
        }
    }
}
