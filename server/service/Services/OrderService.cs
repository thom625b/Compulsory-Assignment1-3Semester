using DataAccess;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using service.Interfaces;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Services;

public class OrderService : IOrderService
{
    private readonly MyDbContext _context;
    private readonly CustomerService _customerService;
    private readonly IValidator<CreateOrderDto> _createOrderValidator;

    public OrderService(MyDbContext context, IValidator<CreateOrderDto> createOrderValidator, CustomerService customerService)
    {
        _context = context;
        _createOrderValidator = createOrderValidator;
        _customerService = customerService;
    }

    public async Task<OrderDto> CreateOrder(CreateOrderDto createOrderDto)
    {
        _createOrderValidator.ValidateAndThrow(createOrderDto);

       var customer = await _context.Customers.FirstAsync(c => c.Email == createOrderDto.CustomerEmail);
    
        var order = createOrderDto.ToOrder(customer.Id);
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();
        return OrderDto.FromEntity(order);
    }
}