using DataAccess.Models;

namespace service.Interfaces;

public interface IFeaturePaperService
{
    Task<List<Feature>> GetAllPaperFeatures();
}