using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using service.Interfaces;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class FeaturePaperController : ControllerBase
{
    private readonly IFeaturePaperService _featurePaperService;


    public FeaturePaperController(IFeaturePaperService featurePaperService)
    {
        _featurePaperService = featurePaperService;
    }


    [HttpGet]
    [Route("papers/{paperId}/features/{featureId}/stock")]
    public async Task<ActionResult<int>> GetFeatureStock(int paperId, int featureId)
    {
        try
        {
            var stock = await _featurePaperService.GetFeatureStock(paperId, featureId);
            return Ok(stock);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }
    
    [HttpPatch]
    [Route("features/{id}")]
    public async Task<ActionResult<PaperDto>> AddFeaturesToPaper(int id, FeaturesToPaperDto featuresToPaperDto)
    {
        if (id != featuresToPaperDto.PaperId)
        {
            return BadRequest("No such paper id");
        }

        var updatedPaper = await _featurePaperService.AddFeatureToPaper(featuresToPaperDto);
        return Ok(updatedPaper);
    }
    
    
}