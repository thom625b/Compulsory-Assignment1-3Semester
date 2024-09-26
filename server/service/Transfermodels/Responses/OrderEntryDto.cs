using DataAccess.Models;

namespace service.Transfermodels.Responses;

public class OrderEntryDto
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public int? ProductId { get; set; }
    public int? OrderId { get; set; }
    public PaperDto? Product { get; set; }
    
    public static OrderEntryDto FromEntity(OrderEntry orderEntry)
    {
        return new OrderEntryDto()
        {
            Id = orderEntry.Id,
            Quantity = orderEntry.Quantity,
            ProductId = orderEntry.ProductId,
            OrderId = orderEntry.OrderId,
            Product = orderEntry.Product != null ? PaperDto.FromEntity(orderEntry.Product) : null
        };
    }
}