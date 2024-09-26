using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
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

    public async Task<int?> GetCustomerIdByEmail(string email)
    {
        var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);
        return customer?.Id;
    }

    public async Task<List<Customer>> GetAllCustomers() => await _context.Customers.ToListAsync();
    public async Task<Customer?> GetCustomer(int id) => await _context.Customers.FirstOrDefaultAsync(c => c.Id == id);

}