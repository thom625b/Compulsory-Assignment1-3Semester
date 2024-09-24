using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using service;
using service.Interfaces;
using service.Services;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class FeatureController : ControllerBase
{
    private readonly IFeatureService _featuresService;

    public FeatureController(IFeatureService featuresService)
    {
        _featuresService = featuresService;
    }
    
    [HttpPost]
    [Route("")]
    public async Task<ActionResult<FeatureDto>> CreateFeature(CreateFeatureDto createFeatureDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var createFeature = await _featuresService.CreateFeature(createFeatureDto);
        return CreatedAtAction(nameof(CreateFeature), new {id = createFeature.Id}, createFeature);
    }


    [HttpGet]
    [Route("")]
    public ActionResult<List<Feature>> GetAllFeatures()
    {
        var features = _featuresService.GetAllFeatures();
        return Ok(features);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Feature>> GetFeature(int id)
    {
        var feature = await _featuresService.GetFeature(id);

        if (feature == null)
        {
            return NotFound();
        }

        return feature;
    }
    
}