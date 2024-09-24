using DataAccess.Models;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Interfaces;

public interface ICustomerService
{
    Task<CustomerDto> CreateCustomer(CreateCustomerDto createCustomerDto);

    List<Customer> GetAllCustomers();

    Task<Customer> GetCustomer(int id);
}