using System.Data;
using DataAccess;
using DataAccess.Models;
using DotNet.Testcontainers.Clients;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Moq;
using service.Interfaces;
using service.Services;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace UnitTest;

public class OrderTests 
{
    private readonly MyDbContext _context;
    private readonly Mock<IValidator<CreateOrderDto>> _createOrderValidatorMock;
    private readonly Mock<IValidator<UpdateOrderDto>> _updateOrderValidatorMock;
    private readonly Mock<ICustomerService> _customerServiceMock;
    private readonly OrderService _orderService;

    
    public OrderTests()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new MyDbContext(options);
        _createOrderValidatorMock = new Mock<IValidator<CreateOrderDto>>();
        _updateOrderValidatorMock = new Mock<IValidator<UpdateOrderDto>>();
        _customerServiceMock = new Mock<ICustomerService>(); // Mocking the interface

        _orderService = new OrderService(
            _context, _createOrderValidatorMock.Object,
            _customerServiceMock.Object, _updateOrderValidatorMock.Object);
    }


    [Fact]
    public async Task CreateOrder_ShouldAddOrderToDatabase()
    {
        // Arrange: Create necessary entities and seed them into the in-memory database
        var customer = new Customer { Id = 1, Email = "testingmail@hotmail.com", Name = "Test Customer", Address = "Nowhere 2"};
        var paper = new Paper { Id = 1, Name = "Test Product", Price = 10 };

        _context.Customers.Add(customer);
        _context.Papers.Add(paper);
        await _context.SaveChangesAsync();

        var createOrderDto = new CreateOrderDto()
        {
            OrderDate = DateTime.Parse("2024-09-26T08:20:37.569Z"),
            DeliveryDate = DateOnly.Parse("2024-09-26"),
            Status = OrderStatus.Pending, 
            TotalAmount = 1,
            CustomerEmail = "testingmail@hotmail.com",
            OrderEntries = new List<CreateOrderEntryDto>
            {
                new CreateOrderEntryDto
                {
                    Quantity = 1,
                    ProductId = 1
                }
            }
        };

        // Mock validator behavior (successful validation)
        _createOrderValidatorMock
            .Setup(v => v.Validate(It.IsAny<CreateOrderDto>()))
            .Returns(new FluentValidation.Results.ValidationResult());

        // Mock customer service behavior
        _customerServiceMock
            .Setup(s => s.GetCustomerIdByEmail(createOrderDto.CustomerEmail))
            .ReturnsAsync(new CustomerDto 
            { 
                Id = customer.Id, 
                Email = customer.Email, 
                Name = customer.Name, 
                Address = customer.Address
            });


        // Act
        var result = await _orderService.CreateOrder(createOrderDto);

        // Assert
        var orderInDb = await _context.Orders.Include(o => o.OrderEntries).FirstOrDefaultAsync(o => o.Id == result.Id);
        Assert.NotNull(orderInDb);
        Assert.Equal(createOrderDto.OrderDate, orderInDb.OrderDate);
        Assert.Equal(createOrderDto.DeliveryDate, orderInDb.DeliveryDate);
        Assert.Equal(createOrderDto.TotalAmount, orderInDb.TotalAmount);
        Assert.Equal(createOrderDto.Status, (OrderStatus)orderInDb.Status);
        Assert.Single(orderInDb.OrderEntries);
        Assert.Equal(1, orderInDb.OrderEntries.First().ProductId);
        Assert.Equal(1, orderInDb.OrderEntries.First().Quantity);
    }

    [Fact]
    public async Task DecreaseStock_ShouldDecreaseStockOnPaper()
    {
        // Arrange: Create necessary entities and seed them into the in-memory database
        var paper = new Paper { Id = 2, Name = "Test Product", Price = 10, Stock = 100};
        
        _context.Papers.Add(paper);
        await _context.SaveChangesAsync();

        // Act
        var result = await _orderService.DecreaseProductStockAsync(paper.Id, 10);
        
        // Assert: Verify that the stock was reduced by 10
        var updatedPaper = await _context.Papers.FirstOrDefaultAsync(p => p.Id == paper.Id);
        Assert.NotNull(updatedPaper);
        Assert.Equal(90, updatedPaper.Stock);
        Assert.True(result);
    }

    
}