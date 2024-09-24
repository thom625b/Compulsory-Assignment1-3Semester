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

    public PaperService(MyDbContext context, IValidator<CreatePaperDto> createPaperValidator)
    {
        _context = context;
        _createPaperValidator = createPaperValidator;
    }
    public async Task<PaperDto> CreatePaper(CreatePaperDto createPaperDto)
    {
        _createPaperValidator.ValidateAndThrow(createPaperDto);
        var paper = createPaperDto.ToPaper();
        await _context.Papers.AddAsync(paper);
        await _context.SaveChangesAsync();
        return PaperDto.FromEntity(paper);
    }

    public async Task<List<Paper>> GetAllPapers() => await _context.Papers.Include(p => p.OrderEntries).ToListAsync();

    public async Task<Paper> GetPaper(int id) =>
        await _context.Papers.Include(p => p.OrderEntries).FirstOrDefaultAsync(p => p.Id == id);
    
}