using System.Collections;
using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using service.Interfaces;
using service.Converters;
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
        // Convert enum to int
        order.Status = (int)createOrderDto.Status;

        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();

        foreach (var entryDto in createOrderDto.OrderEntries)
        {
            var newOrderEntry = OrderEntryConverter.ConvertToOrderEntry(entryDto, order.Id);
            
            var existingEntry =
                order.OrderEntries.FirstOrDefault(
                    e => e.ProductId == newOrderEntry.ProductId && e.FeatureId == newOrderEntry.FeatureId);

            if (existingEntry != null)
            {
                existingEntry.Quantity += newOrderEntry.Quantity;
            }
            else
            {
                order.OrderEntries.Add(newOrderEntry);
            }
        }

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

            // Convert enum to int
            order.Status = (int)newStatus; 
            await _context.SaveChangesAsync(); 
        }


        public async Task<bool> DecreaseProductStockAsync(int productId, int quantity)
        {
            try
            {
                var paper = await _context.Papers
                    .Include(p => p.PaperFeatures)
                    .FirstOrDefaultAsync(p => p.Id == productId);

                if (paper == null)
                {
                    throw new Exception("Paper product not found.");
                }
                
                if (paper.Stock < quantity)
                {
                    throw new Exception($"Not enough stock for {paper.Name}. Available: {paper.Stock}, Requested: {quantity}");
                }

                foreach (var paperFeature in paper.PaperFeatures)
                {
                    if (paperFeature.FeatureStock < quantity)
                    {
                        throw new Exception(
                            $"Not enough stock for the feature: {paperFeature.Feature.FeatureName}, Available: {paperFeature.FeatureStock}");
                    }
                }
                
                paper.Stock -= quantity;

                foreach (var paperFeature in paper.PaperFeatures)
                {
                    paperFeature.FeatureStock -= quantity;
                }
                _context.Papers.Update(paper);

                foreach (var paperFeature in paper.PaperFeatures)
                {
                    _context.PaperFeatures.Update(paperFeature);
                }
                
                await _context.SaveChangesAsync();

                return true; 
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to decrease stock", ex);
            }
        }

}