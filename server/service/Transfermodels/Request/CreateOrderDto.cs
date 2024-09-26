using DataAccess.Models;

namespace service.Transfermodels.Request;

public class CreateOrderDto
{
    public DateTime OrderDate { get; set; }
    public DateOnly? DeliveryDate { get; set; }
    public string Status { get; set; } = null!;
    public double TotalAmount { get; set; }
    public int? CustomerId { get; set; }
    public ICollection<CreateOrderEntryDto> OrderEntries { get; set; } = new List<CreateOrderEntryDto>();


    public Order ToOrder()
    {
        return new Order()
        {
            OrderDate = OrderDate,
            DeliveryDate = DeliveryDate,
            Status = Status,
            TotalAmount = TotalAmount,
            CustomerId = CustomerId,
            OrderEntries = OrderEntries.Select(oe => oe.ToOrderEntry()).ToList()
        };
    }
}