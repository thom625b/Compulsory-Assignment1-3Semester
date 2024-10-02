using DataAccess.Models;

namespace service.Transfermodels.Responses;

public class PaperFeatureDto
{
    
    public int PaperId { get; set; }
    public int FeatureId { get; set; }
    public int FeatureStock { get; set; }

    public static PaperFeatureDto FromEntity(PaperFeature paperFeature)
    {
        return new PaperFeatureDto
        {
            PaperId = paperFeature.PaperId,
            FeatureId = paperFeature.FeatureId,
            FeatureStock = paperFeature.FeatureStock ?? 0
        };
    }
}