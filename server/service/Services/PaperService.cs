using DataAccess;
using FluentValidation;
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
}