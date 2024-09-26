using DataAccess;
using FluentValidation;
using service.Interfaces;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Services;

public class OrderService : IOrderService
{
    private readonly MyDbContext _context;
    private readonly IValidator<CreateOrderDto> _createOrderValidator;

    public OrderService(MyDbContext context, IValidator<CreateOrderDto> createOrderValidator)
    {
        _context = context;
        _createOrderValidator = createOrderValidator;
    }

    public async Task<OrderDto> CreateOrder(CreateOrderDto createOrderDto)
    {
        _createOrderValidator.ValidateAndThrow(createOrderDto);
        var order = createOrderDto.ToOrder();
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();
        return OrderDto.FromEntity(order);
    }
}