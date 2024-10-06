using DataAccess.Models;
using System.Text.Json.Serialization;

namespace service.Transfermodels.Request
{
    public class CreateOrderDto
    {
        public DateTime OrderDate { get; set; }
        public DateOnly? DeliveryDate { get; set; }
        
        [JsonConverter(typeof(JsonStringEnumConverter))] // This will serialize the enum as a string
        public OrderStatus Status { get; set; } 
        
        public double TotalAmount { get; set; }
        public string CustomerEmail { get; set; } = null!;
        public ICollection<CreateOrderEntryDto> OrderEntries { get; set; } = new List<CreateOrderEntryDto>();

        public Order ToOrder(int customerId)
        {
            var o = new Order()
            {
                CustomerId = customerId,
                OrderDate = OrderDate,
                DeliveryDate = DeliveryDate,
                // Convert enum to int
                Status = (int)Status, 
                TotalAmount = TotalAmount,
            };
            return o;
        }

    }
}