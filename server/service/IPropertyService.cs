using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service;

public interface IPropertyService
{
    Task<PropertyDto> CreateProperty(CreatePropertyDto createPropertyDto);
}