using DataAccess.Models;

namespace service.Transfermodels.Request
{
    public class CreateOrderDto
    {
        public DateTime OrderDate { get; set; }
        public DateOnly? DeliveryDate { get; set; }
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
                Status = Status, 
                TotalAmount = TotalAmount,
                OrderEntries = OrderEntries.Select(oe => oe.ToOrderEntry()).ToList()
            };
            return o;
        }
    }
}