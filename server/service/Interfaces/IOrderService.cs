using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Interfaces;

public interface IOrderService
{
    Task<OrderDto> CreateOrder(CreateOrderDto createOrderDto);
}