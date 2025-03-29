using MediatR;
using Microsoft.AspNetCore.Mvc;
using QoudaApp.Application.Features.Commands.ExcelData;
using QoudaApp.Application.Features.Queries.ExcelData;
using QoudaApp.Shared.Helpers;
using System.IO;

namespace QoudaApp.API.Controllers.ExcelData;

[ApiController]
[Route("api/[controller]/[action]")]
public class ExcelDataController(ISender mediator) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Upload([FromForm] UploadExcelCommand command)
    {
        var response = await mediator.Send(command);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] PaginationPayload payload)
    {
        var query = new GetExcelDataQuery(payload);
        var excelData = await mediator.Send(query);
        return Ok(excelData);
    }

    [HttpGet]
    public async Task<IActionResult> Download()
    {
        var query = new DownloadExcelQuery();
        var response = await mediator.Send(query);
        Response.Headers.Append("Content-Disposition", $"attachment; filename=ExcelData.xlsx");
        Response.Headers.Append("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        return File(response, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "ExcelData.xlsx");
    }
}
