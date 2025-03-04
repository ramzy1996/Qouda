using QoudaApp.API.Extensions;
using QoudaApp.API.Middlewares;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add application services
builder.AddApplicationServices();
builder.AddCoreServices();

// add database services
builder.AddDatabaseServices();

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

await app.UseDatabaseAsync();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment() || app.Environment.IsEnvironment("Local"))
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowQoudaOrigins");

app.UseMiddleware<ExceptionMiddleware>();
//app.UseMiddleware<ResponseWrapperMiddleware>();
app.UseMiddleware<SuccessResponseMiddleware>();
//app.UseRouting();

//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

await app.RunAsync();