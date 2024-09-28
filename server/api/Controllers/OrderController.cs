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
    
}