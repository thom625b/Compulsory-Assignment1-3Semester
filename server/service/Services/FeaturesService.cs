using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using service.Interfaces;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Services;


public class FeaturesService : IFeatureService
{

    private readonly MyDbContext _context;
    private readonly IValidator<CreateFeatureDto> _createFeatureValidator;

    public FeaturesService(MyDbContext context, IValidator<CreateFeatureDto> createFeatureValidator)
    {
        _context = context;
        _createFeatureValidator = createFeatureValidator;
    }
    
    public async Task<FeatureDto> CreateFeature(CreateFeatureDto createFeatureDto)
    {
        _createFeatureValidator.ValidateAndThrow(createFeatureDto);
        var feature = createFeatureDto.ToFeature();
        await _context.Features.AddAsync(feature);
        await _context.SaveChangesAsync();
        return FeatureDto.FromEntity(feature);
    }
    
    
    public List<Feature> GetAllFeatures()
    {
        return _context.Features.ToList();
    }
}