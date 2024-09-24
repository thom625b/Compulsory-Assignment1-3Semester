using DataAccess.Models;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Interfaces;

public interface IPropertyService
{
    Task<PropertyDto> CreateProperty(CreatePropertyDto createPropertyDto);

    List<Property> GetAllProperties();
}