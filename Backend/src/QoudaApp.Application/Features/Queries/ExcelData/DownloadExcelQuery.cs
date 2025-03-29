using MediatR;

namespace QoudaApp.Application.Features.Queries.ExcelData;

public record DownloadExcelQuery() : IRequest<Stream>;
