using System.Text.Json;
using System.Text.Json.Serialization;
using DataAccess;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using service.Interfaces;
using service;
using service.Services;
using service.Validators;
using Service.Validators;

var builder = WebApplication.CreateBuilder(args);      

builder.Services.AddOptionsWithValidateOnStart<AppOptions>()
    .Bind(builder.Configuration.GetSection(nameof(AppOptions)))
    .ValidateDataAnnotations()
    .Validate(options => new AppOptionsValidator().Validate(options).IsValid,
        $"{nameof(AppOptions)} validation failed");
builder.Services.AddDbContext<MyDbContext>((serviceProvider, options) =>
{
    var appOptions = serviceProvider.GetRequiredService<IOptions<AppOptions>>
        ().Value;
    options.UseNpgsql(Environment.GetEnvironmentVariable("Dunderdb") ?? appOptions.Dunderdb);
});


builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<IPaperService, PaperService>();
builder.Services.AddScoped<IFeatureService, FeaturesService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
builder.Services.AddFluentValidationAutoValidation()
    .AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CreatePaperValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateFeatureValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateCustomerValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateOrderValidator>();
builder.Services.AddOpenApiDocument();



var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
        var dbContext = scope.ServiceProvider.GetRequiredService<MyDbContext>();
        dbContext.Database.EnsureCreated();
}

app.UseOpenApi();
app.UseSwaggerUi();
app.MapControllers();
app.UseCors(config =>
{
    config.AllowAnyHeader();
    config.AllowAnyMethod();
    config.AllowAnyOrigin();
});

app.Run();

public partial class Program {}