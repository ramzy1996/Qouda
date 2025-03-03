using FluentValidation;
using QoudaApp.Application;
using QoudaApp.Domain.Interfaces;
using QoudaApp.Infrastructure.Services;
using System.Reflection;

namespace QoudaApp.API.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this WebApplicationBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);

        //define assemblies
        var assemblies = new Assembly[]
        {
            typeof(ApplicationMetadata).Assembly,
        };

        //register validators
        builder.Services.AddValidatorsFromAssemblies(assemblies);

        //register mediatr
        builder.Services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssemblies(assemblies);
        });


        // Register Services
        builder.Services.AddScoped<IExcelDataService, ExcelDataService>();

        return builder.Services;
    }
}