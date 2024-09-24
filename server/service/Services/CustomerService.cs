using DataAccess;
using DataAccess.Models;
using FluentValidation;
using service.Interfaces;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Services;

public class CustomerService : ICustomerService
{
    private readonly MyDbContext _context;
    private readonly IValidator<CreateCustomerDto> _createCustomerValidator;

    public CustomerService(MyDbContext context, IValidator<CreateCustomerDto> createCustomerValidator)
    {
        _context = context;
        _createCustomerValidator = createCustomerValidator;
    }

    public async Task<CustomerDto> CreateCustomer(CreateCustomerDto createCustomerDto)
    {
        _createCustomerValidator.ValidateAndThrow(createCustomerDto);
        var customer = createCustomerDto.ToCustomer();
        await _context.Customers.AddAsync(customer);
        await _context.SaveChangesAsync();
        return CustomerDto.FromEntity(customer);
    }

    public List<Customer> GetAllCustomers()
    {
        throw new NotImplementedException();
    }

    public Task<Customer> GetCustomer(int id)
    {
        throw new NotImplementedException();
    }
}