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

    public async Task<CustomerDto> GetCustomerIdByEmail(string email)
    {
        var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);
        if (customer == null) return null;

        // Map to CustomerDto (assuming you have a mapping method)
        return new CustomerDto
        {
            Id = customer.Id,
            Name = customer.Name,
            Address = customer.Address,
            Phone = customer.Phone,
            Email = customer.Email
        };
    }


    public async Task<List<Customer>> GetAllCustomers(string searchParam = null)
    {
        if (string.IsNullOrEmpty(searchParam))
        {
            return await _context.Customers.ToListAsync();
        }

        return await _context.Customers
            .Where(c => c.Name.Contains(searchParam))
            .ToListAsync();
    }
    public async Task<Customer?> GetCustomer(int id) => await _context.Customers.FirstOrDefaultAsync(c => c.Id == id);

}