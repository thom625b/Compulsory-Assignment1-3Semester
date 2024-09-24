using DataAccess.Models;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Interfaces;

public interface IFeatureService
{
    Task<FeatureDto> CreateFeature(CreateFeatureDto createFeatureDto);

    List<Feature> GetAllFeatures();
}