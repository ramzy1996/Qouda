using MassTransit;
using QoudaApp.Domain.Entities.Common;

namespace QoudaApp.Domain.Entities.ExcelData;

public class ExcelUpload(Guid id) : BaseEntity<Guid>(id)
{
    public ExcelUpload() : this(Guid.Empty) { } // dapper

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }


    public static ExcelUpload Create(string firstName, string lastName, string email, string phoneNumber)
    {
        return new ExcelUpload(NewId.NextGuid())
        {
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            PhoneNumber = phoneNumber
        };
    }
}