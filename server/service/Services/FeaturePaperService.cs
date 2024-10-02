using DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using service.Interfaces;

namespace service.Services;

public class FeaturePaperService : IFeaturePaperService
{
    private readonly MyDbContext _context;

    public FeaturePaperService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<List<Feature>> GetAllPaperFeatures()
    {
        throw new NotImplementedException();
    }
        
}