using DataAccess.Models;

namespace service.Transfermodels.Responses;

public class CustomerDto
{
    
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }

    public static CustomerDto FromEntity(Customer customer)
    {
        return new CustomerDto()
        {
            Id = customer.Id,
            Name = customer.Name,
            Address = customer.Address,
            Phone = customer.Phone,
            Email = customer.Email
        };
    }
}