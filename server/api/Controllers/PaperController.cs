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
    public async Task<ActionResult<List<Paper>>> GetAllPapers(
        [FromQuery] string name = null, 
        [FromQuery] decimal? minPrice = null, 
        [FromQuery] decimal? maxPrice = null, 
        [FromQuery] decimal? maxValue = null,  
        [FromQuery] bool? discontinued = null)
    {
        var papers = await _paperService.GetAllPapers(name, minPrice, maxPrice, maxValue, discontinued);
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

    [HttpPut]
    [Route("update/{id}")]
    public async Task<ActionResult<PaperDto>> UpdatePaper(int Id, UpdatePaperDto updatePaperDto)
    {
        if (Id != updatePaperDto.Id)
        {
            return BadRequest("Paper not found");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatePaper = await _paperService.UpdatePaper(updatePaperDto);
        return Ok(updatePaper);
    }

   
}