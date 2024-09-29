using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using service.Interfaces;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }


    [HttpPost]
    [Route("")]
    public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderDto createOrderDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdOrder = await _orderService.CreateOrder(createOrderDto);
        return CreatedAtAction(nameof(CreateOrder), new { id = createdOrder.Id }, createdOrder);
    }


    [HttpGet]
    [Route("")]
    public async Task<ActionResult<List<Order>>> GetAllOrders()
    {
        var orders = await _orderService.GetAllOrders();
        return Ok(orders);
    }


    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _orderService.GetOrder(id);

        if (order == null)
        {
            return NotFound();
        }

        return order;
    }

    [HttpPut]
    [Route("update/{id}")]

    public async Task<ActionResult<OrderDto>> UpdateOrder(int id, UpdateOrderDto updateOrderDto)
    {
        if (id != updateOrderDto.Id)
        {
            return BadRequest("Order not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updateOrder = await _orderService.UpdateOrder(updateOrderDto);
        return Ok(updateOrder);
    }
    
    
    [HttpPut]
    [Route("{id}/DecreaseStock")]
    public async Task<ActionResult> DecreaseStock(int id, int productId, int quantity)
    {
        try
        {
            var result = await _orderService.DecreaseProductStockAsync(productId, quantity);
            if (result)
            {
                return Ok("Stock decreased successfully.");
            }

            return BadRequest("Failed to decrease stock.");
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}