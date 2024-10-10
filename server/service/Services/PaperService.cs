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
    
    public async Task<List<Paper>> GetAllPapers(
        string name = null, 
        decimal? minPrice = null, 
        decimal? maxPrice = null, 
        decimal? maxValue = null,
        bool? discontinued = null)
    {
        var query = _context.Papers
            .Include(p => p.OrderEntries)
            .Include(p => p.PaperFeatures)
            .AsNoTracking()
            .AsQueryable();
        
        if (!string.IsNullOrEmpty(name))
        {
            query = query.Where(p => p.Name.Contains(name));
        }
        
        if (minPrice.HasValue)
        {
            query = query.Where(p => (decimal)p.Price >= minPrice.Value);
        }

        if (maxPrice.HasValue)
        {
            query = query.Where(p => (decimal)p.Price <= maxPrice.Value);
        }

        if (maxValue.HasValue)
        {
            query = query.Where(p => (decimal)p.Price <= maxValue.Value);
        }

        if (discontinued.HasValue)
        {
            query = query.Where(p => p.Discontinued == discontinued.Value);
        }

        return await query.ToListAsync();
    }


    public async Task<Paper?> GetPaper(int id) =>
        await _context.Papers
            .Include(p => p.OrderEntries)
            .Include(p => p.PaperFeatures)
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

    

}