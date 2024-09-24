using DataAccess.Models;
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

    [HttpGet]
    [Route("")]
    public async Task<ActionResult<List<Paper>>> GetAllPapers()
    {
        var papers = await _paperService.GetAllPapers();
        return Ok(papers);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Paper>> GetPaper(int id)
    {
        var paper = await _paperService.GetPaper(id);

        if (paper == null)
        {
            return NotFound();
        }
        return paper;
    }
}