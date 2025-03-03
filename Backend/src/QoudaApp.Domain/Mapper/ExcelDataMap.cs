using CsvHelper.Configuration;
using QoudaApp.Domain.Entities.ExcelData;

namespace QoudaApp.Domain.Mapper;

public class ExcelDataMap : ClassMap<ExcelUpload>
{
    public ExcelDataMap()
    {
        // Map columns to properties
        Map(m => m.FirstName).Name("FirstName");
        Map(m => m.LastName).Name("LastName");
        Map(m => m.Email).Name("Email");
        Map(m => m.PhoneNumber).Name("PhoneNumber");
    }
}