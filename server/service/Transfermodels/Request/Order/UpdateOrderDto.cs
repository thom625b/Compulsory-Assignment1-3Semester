using DataAccess.Models;

namespace service.Transfermodels.Request;

public class UpdateOrderDto
{
    public int Id { get; set; }
    public DateOnly DeliveryDate { get; set; }
    public double TotalAmount { get; set; }

    public void UpdateOrder(Order order)
    {
        order.DeliveryDate = DeliveryDate;
        order.TotalAmount = TotalAmount;
        
    }
}