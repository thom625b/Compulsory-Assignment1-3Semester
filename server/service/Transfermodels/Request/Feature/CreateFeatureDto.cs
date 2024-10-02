using DataAccess.Models;

namespace service.Transfermodels.Request;

public class CreateFeatureDto

{
    
    public string Name { get; set; } = null!;
    public Feature ToFeature()
    {
        return new Feature()
        {
            FeatureName = Name
        };
    }
    
}