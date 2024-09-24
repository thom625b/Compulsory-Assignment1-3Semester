using Microsoft.AspNetCore.Mvc;
using service.Interfaces;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaperController : ControllerBase
{
    private readonly IPaperService _paperService;

    public PaperController(IPaperService paperService)
    {
        _paperService = paperService;
    }


    [HttpPost]
    [Route("")]
    public async Task<ActionResult<PaperDto>> CreatePaper(CreatePaperDto createPaperDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdPaper = await _paperService.CreatePaper(createPaperDto);
        return CreatedAtAction( nameof(CreatePaper),new { id = createdPaper.Id }, createdPaper);
    }
}