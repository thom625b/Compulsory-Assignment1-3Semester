using DataAccess.Models;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Interfaces;

public interface IOrderService
{
    Task<OrderDto> CreateOrder(CreateOrderDto createOrderDto);

    Task<List<Order>> GetAllOrders();

    Task<Order> GetOrder(int id);

    Task<OrderDto> UpdateOrder(UpdateOrderDto updateOrderDto);
}