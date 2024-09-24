using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using service;
using service.Services;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PropertyController : ControllerBase
{
    private readonly IPropertyService _propertiesService;

    public PropertyController(IPropertyService propertiesService)
    {
        _propertiesService = propertiesService;
    }
    
    [HttpPost]
    [Route("")]
    public async Task<ActionResult<PropertyDto>> CreateProperty(CreatePropertyDto createPropertyDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var createProperty = await _propertiesService.CreateProperty(createPropertyDto);
        return CreatedAtAction(nameof(CreateProperty), new {id = createProperty.Id}, createProperty);
    }
}