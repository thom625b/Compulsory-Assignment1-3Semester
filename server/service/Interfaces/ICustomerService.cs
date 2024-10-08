using DataAccess.Models;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Interfaces;

public interface ICustomerService
{
    Task<CustomerDto> CreateCustomer(CreateCustomerDto createCustomerDto);


    Task<List<Customer>> GetAllCustomers(string searchParam = null);

    Task<Customer?> GetCustomer(int id);

    Task<CustomerDto> GetCustomerIdByEmail(string email);


}