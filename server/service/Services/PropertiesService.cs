using DataAccess;
using FluentValidation;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using service.Interfaces;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Services;


public class PropertiesService : IPropertyService
{

    private readonly MyDbContext _context;
    private readonly IValidator<CreatePropertyDto> _createPropertyValidator;

    public PropertiesService(MyDbContext context, IValidator<CreatePropertyDto> createPropertyValidator)
    {
        _context = context;
        _createPropertyValidator = createPropertyValidator;
    }
    
    public async Task<PropertyDto> CreateProperty(CreatePropertyDto createPropertyDto)
    {
        _createPropertyValidator.ValidateAndThrow(createPropertyDto);
        var property = createPropertyDto.ToProperty();
        await _context.Properties.AddAsync(property);
        await _context.SaveChangesAsync();
        return PropertyDto.FromEntity(property);
    }
}