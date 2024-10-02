using DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using service.Interfaces;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Services;

public class FeaturePaperService : IFeaturePaperService
{
    private readonly MyDbContext _context;

    public FeaturePaperService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<List<PaperFeature>> GetAllPaperFeatures()
    {
        throw new NotImplementedException();
    }
        
    
    public async Task<PaperDto> AddFeatureToPaper(FeaturesToPaperDto featuresToPaperDto)
    {
        var paper = await _context.Papers
            .Include(p => p.PaperFeatures)
            .ThenInclude(pf => pf.Feature)
            .FirstOrDefaultAsync(p => p.Id == featuresToPaperDto.PaperId);
        
        if (paper == null) throw new KeyNotFoundException("Paper not found");

        var features = await _context.Features
            .Where(f => featuresToPaperDto.FeatureIds.Contains(f.Id))
            .ToListAsync();
        if (features.Count != featuresToPaperDto.FeatureIds.Count)
            throw new KeyNotFoundException("Some Features not found");

        var featureStockValue = featuresToPaperDto.FeatureStock;

        int stockAdd = 0;
        
        foreach (var feature in features)
        {
            var existingFeature = paper.PaperFeatures.FirstOrDefault(f => f.FeatureId == feature.Id);

            if (existingFeature == null)
            {
                paper.PaperFeatures.Add( new PaperFeature
                {
                    PaperId = paper.Id,
                    FeatureId = feature.Id,
                    FeatureStock = featureStockValue
                });
                stockAdd += featureStockValue;
            }
            else
            {
                existingFeature.FeatureStock += featureStockValue;
                stockAdd += featureStockValue;
            }
            
        }
        await _context.SaveChangesAsync();
        return PaperDto.FromEntity(paper);
    }

    public async Task<int> GetFeatureStock(int paperId, int featureId)
    {
        var paper = await _context.Papers
            .Include(p => p.PaperFeatures)
            .FirstOrDefaultAsync(p => p.Id == paperId);

        if (paper == null) throw new KeyNotFoundException("Paper not found");

        var feature = paper.PaperFeatures
            .FirstOrDefault(f => f.FeatureId == featureId);

        if (feature == null) throw new KeyNotFoundException("Feature not found");

        return feature.FeatureStock ?? 0;

    }
}