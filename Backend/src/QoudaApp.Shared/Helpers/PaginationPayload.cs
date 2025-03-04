namespace QoudaApp.Shared.Helpers;

public sealed record PaginationPayload(string? SearchBy, string? SortDirection, string? SortBy, string? OrderBy, int PageNumber = 1, int PageSize = 10);