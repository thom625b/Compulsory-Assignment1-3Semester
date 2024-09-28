using DataAccess;
using DataAccess.Models;
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
    private readonly IValidator<UpdateOrderDto> _updateOrderValidator;

    public OrderService(MyDbContext context, IValidator<CreateOrderDto> createOrderValidator, CustomerService customerService, IValidator<UpdateOrderDto> updateOrderValidator)
    {
        _context = context;
        _createOrderValidator = createOrderValidator;
        _customerService = customerService;
        _updateOrderValidator = updateOrderValidator;
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

  
        public async Task<List<Order>> GetAllOrders() =>
            await _context.Orders.Include(o => o.OrderEntries).ToListAsync();

        public async Task<Order> GetOrder(int id) =>
            await _context.Orders.Include(o => o.OrderEntries).FirstOrDefaultAsync(o => o.Id == id) ?? throw new InvalidOperationException();

        public async Task<OrderDto> UpdateOrder(UpdateOrderDto updateOrderDto)
        {
            _updateOrderValidator.ValidateAndThrow(updateOrderDto);
            var order = await GetOrder(updateOrderDto.Id);
            if (order == null) throw new KeyNotFoundException("No order found");
            updateOrderDto.UpdateOrder(order);
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return OrderDto.FromEntity(order);
        }
}