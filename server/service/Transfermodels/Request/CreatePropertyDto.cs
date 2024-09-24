using DataAccess.Models;

namespace service.Transfermodels.Request;

public class CreatePropertyDto

{
    
    public string Name { get; set; } = null!;
    public Property ToProperty()
    {
        return new Property()
        {
            PropertyName = Name
        };
    }
    
}