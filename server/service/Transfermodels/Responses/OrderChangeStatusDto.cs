using DataAccess.Models;

namespace service.Transfermodels.Responses;

public class OrderChangeStatusDto
{
    public OrderStatus NewStatus { get; set; }
}