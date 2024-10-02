using DataAccess.Models;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Interfaces;

public interface IFeaturePaperService
{
    
    Task<PaperDto> AddFeatureToPaper(FeaturesToPaperDto featuresToPaperDto);
    Task<List<PaperFeature>> GetAllPaperFeatures();
    Task<int> GetFeatureStock(int paperId, int featureId);

}