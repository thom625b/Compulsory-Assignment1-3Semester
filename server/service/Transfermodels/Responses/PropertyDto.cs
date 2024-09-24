using DataAccess.Models;

namespace service.Transfermodels.Responses;

public class PropertyDto
{
    public static PropertyDto FromEntity(Property property)
    {
        return new PropertyDto
        {
            Name = property.PropertyName,
            Id = property.Id
        };
    }
    
    public string Name { get; set; }
    
    public int Id { get; set; }

    
}