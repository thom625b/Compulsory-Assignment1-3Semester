using System.Text.Json;
using System.Text.Json.Serialization;
using DataAccess;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using service.Interfaces;
using service;
using service.Services;
using service.Validators;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<MyDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("Dunderdb"));
});


builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<IPaperService, PaperService>();
builder.Services.AddScoped<IFeatureService, FeaturesService>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
builder.Services.AddFluentValidationAutoValidation()
    .AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CreatePaperValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateFeatureValidator>();
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