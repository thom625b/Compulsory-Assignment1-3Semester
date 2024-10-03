using DataAccess.Models;

namespace service.Transfermodels.Responses;

public class OrderDto
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public DateOnly? DeliveryDate { get; set; }
    public string? Status { get; set; }  
    public double TotalAmount { get; set; }
    public int? CustomerId { get; set; }
    public virtual ICollection<OrderEntryDto> OrderEntries { get; set; } = new List<OrderEntryDto>();

    public static OrderDto FromEntity(Order order)
    {
        return new OrderDto()
        {
            Id = order.Id,
            OrderDate = order.OrderDate,
            DeliveryDate = order.DeliveryDate,
            Status = order.Status.ToString(),  
            TotalAmount = order.TotalAmount,
            CustomerId = order.CustomerId,
            OrderEntries = order.OrderEntries.Select(oe => OrderEntryDto.FromEntity(oe)).ToList()
        };
    }
}