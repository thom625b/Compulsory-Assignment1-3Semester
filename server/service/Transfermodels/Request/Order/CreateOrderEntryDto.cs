using DataAccess.Models;

namespace service.Transfermodels.Request;

public class CreateOrderEntryDto
{
    public int Quantity { get; set; }
    
    public int ProductId { get; set; }
    public int FeatureId { get; set; }
    
    public int OrderId { get; set; }
    
    public OrderEntry ToOrderEntry()
    {
        return new OrderEntry()
        {
            Quantity = Quantity,
            ProductId = ProductId,
            FeatureId = FeatureId,
            OrderId = OrderId
        };
    }
}