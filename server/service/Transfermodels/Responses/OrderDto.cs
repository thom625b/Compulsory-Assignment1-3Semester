using DataAccess.Models;
using System.Text.Json.Serialization;

namespace service.Transfermodels.Responses
{
    // OrderDto.cs
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public DateOnly? DeliveryDate { get; set; }
    
        [JsonConverter(typeof(JsonStringEnumConverter))] // This will serialize the enum as a string
        public OrderStatus Status { get; set; }  
    
        public double TotalAmount { get; set; }
        public int? CustomerId { get; set; }
        public virtual ICollection<OrderEntryDto> OrderEntries { get; set; } = new List<OrderEntryDto>();

        public static OrderDto FromEntity(Order order)
        {
            return new OrderDto()
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                DeliveryDate = order.DeliveryDate,
                Status = (OrderStatus)order.Status,  
                TotalAmount = order.TotalAmount,
                CustomerId = order.CustomerId,
                OrderEntries = order.OrderEntries.Select(oe => OrderEntryDto.FromEntity(oe)).ToList()
            };
        }
    }
}