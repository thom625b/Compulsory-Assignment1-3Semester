namespace service.Transfermodels.Request;

public class FeaturesToPaperDto
{
    public int PaperId { get; set; }
    public List<int> FeatureIds { get; set; } = new List<int>();
}