using DataAccess.Models;
using service.Transfermodels.Request;

namespace service.Converters;

public static class OrderEntryConverter
{
    public static OrderEntry ConvertToOrderEntry(CreateOrderEntryDto entryDto, int orderId)
    {
        return new OrderEntry
        {
            Quantity = entryDto.Quantity,
            ProductId = entryDto.ProductId,
            FeatureId = entryDto.FeatureId,
            OrderId = orderId
        };
    }
}