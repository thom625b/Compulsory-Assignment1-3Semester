using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using service.Interfaces;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Services;

public class PaperService : IPaperService   
{
    private readonly MyDbContext _context;
    private readonly IValidator<CreatePaperDto> _createPaperValidator;
    private readonly IValidator<UpdatePaperDto> _updatePaperValidator;

    public PaperService(MyDbContext context, IValidator<CreatePaperDto> createPaperValidator, IValidator<UpdatePaperDto> updatePaperValidator)
    {
        _context = context;
        _createPaperValidator = createPaperValidator;
        _updatePaperValidator = updatePaperValidator;
    }
    public async Task<PaperDto> CreatePaper(CreatePaperDto createPaperDto)
    {
        _createPaperValidator.ValidateAndThrow(createPaperDto);
        var paper = createPaperDto.ToPaper();
        await _context.Papers.AddAsync(paper);
        await _context.SaveChangesAsync();
        return PaperDto.FromEntity(paper);
    }

    public async Task<List<Paper>> GetAllPapers() => await _context.Papers
        .Include(p => p.OrderEntries)
        .Include(p => p.Features)
        .ToListAsync();

    public async Task<Paper?> GetPaper(int id) =>
        await _context.Papers
            .Include(p => p.OrderEntries)
            .Include(p => p.Features)
            .FirstOrDefaultAsync(p => p.Id == id);


    public async Task<PaperDto> UpdatePaper(UpdatePaperDto updatePaperDto)
    {
        _updatePaperValidator.ValidateAndThrow(updatePaperDto);
        var paper = await GetPaper(updatePaperDto.Id);
        if (paper == null) throw new KeyNotFoundException("No paper found");
        updatePaperDto.UpdatePaper(paper);
        _context.Papers.Update(paper);
        await _context.SaveChangesAsync();
        return PaperDto.FromEntity(paper);
    }

    public async Task<PaperDto> AddFeatureToPaper(FeaturesToPaperDto featuresToPaperDto)
    {
        var paper = await _context.Papers.Include(p => p.Features).Include(p => p.Features)
            .FirstOrDefaultAsync(p => p.Id == featuresToPaperDto.PaperId);
        if (paper == null) throw new KeyNotFoundException("Paper not found");

        var features = await _context.Features
            .Where(f => featuresToPaperDto.FeatureIds.Contains(f.Id))
            .ToListAsync();
        if (features.Count != featuresToPaperDto.FeatureIds.Count)
            throw new KeyNotFoundException("Some Features not found");
        
        foreach (var feature in features)
        {
            if (!paper.Features.Any(f => f.Id == feature.Id))
            {
                paper.Features.Add(feature);
            }
        }
        await _context.SaveChangesAsync();
        return PaperDto.FromEntity(paper);
    }

}