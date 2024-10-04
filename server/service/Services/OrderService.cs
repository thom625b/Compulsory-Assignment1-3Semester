using System.Collections;
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
    private readonly ICustomerService _customerService;
    private readonly IValidator<CreateOrderDto> _createOrderValidator;
    private readonly IValidator<UpdateOrderDto> _updateOrderValidator;

    public OrderService(MyDbContext context, IValidator<CreateOrderDto> createOrderValidator, ICustomerService customerService, IValidator<UpdateOrderDto> updateOrderValidator)
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

        
        public async Task UpdateOrderStatus(int orderId, OrderStatus newStatus)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                throw new InvalidOperationException("Order not found.");
            }

            order.Status = newStatus; 
            await _context.SaveChangesAsync(); 
        }

        public async Task<bool> DecreaseProductStockAsync(int productId, int quantity)
        {
            try
            {
                var paper = await _context.Papers.FirstOrDefaultAsync(p => p.Id == productId);

                if (paper == null)
                {
                    throw new Exception("Paper product not found.");
                }

                // Check if enough stock is available
                if (paper.Stock < quantity)
                {
                    throw new Exception($"Not enough stock for {paper.Name}. Available: {paper.Stock}, Requested: {quantity}");
                }

                // Decrease the stock by the specified quantity
                paper.Stock -= quantity;

                // Update the paper in the database
                _context.Papers.Update(paper);
                await _context.SaveChangesAsync();

                return true; 
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to decrease stock", ex);
            }
        }

}