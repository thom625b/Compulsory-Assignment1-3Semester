using DataAccess.Models;

namespace service.Transfermodels.Responses;

public class FeatureDto
{
    public static FeatureDto FromEntity(Feature feature)
    {
        return new FeatureDto
        {
            Name = feature.FeatureName,
            Id = feature.Id
        };
    }
    
    public string Name { get; set; }
    
    public int Id { get; set; }

    
}