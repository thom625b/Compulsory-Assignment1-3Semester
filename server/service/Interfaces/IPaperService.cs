using DataAccess.Models;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Interfaces;

public interface IPaperService
{
    Task<PaperDto> UpdatePaper(UpdatePaperDto updatePaperDto);
    
    Task<PaperDto> CreatePaper(CreatePaperDto createPaperDto);

    Task<List<Paper>> GetAllPapers(string name = null);

    Task<Paper> GetPaper(int id);

    

}