using DataAccess.Models;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Interfaces;

public interface IPaperService
{
    Task<PaperDto> UpdatePaper(UpdatePaperDto updatePaperDto);
    
    Task<PaperDto> CreatePaper(CreatePaperDto createPaperDto);

    Task<List<Paper>> GetAllPapers();

    Task<Paper> GetPaper(int id);

    Task<PaperDto> AddFeatureToPaper(FeaturesToPaperDto featuresToPaperDto);

}