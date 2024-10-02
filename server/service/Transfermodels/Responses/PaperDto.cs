using DataAccess.Models;

namespace service.Transfermodels.Responses;

public class PaperDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    public virtual ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>();
    public virtual ICollection<PaperFeature> PaperFeatures { get; set; } = new List<PaperFeature>();


    public static PaperDto FromEntity(Paper paper)
    {
        return new PaperDto()
        {
            Id = paper.Id,
            Name = paper.Name,
            Discontinued = paper.Discontinued,
            Stock = paper.Stock,
            Price = paper.Price,
            OrderEntries = paper.OrderEntries,
            PaperFeatures = paper.PaperFeatures
        };
    }
}