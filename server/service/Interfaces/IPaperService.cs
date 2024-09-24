using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace service.Interfaces;

public interface IPaperService
{
    Task<PaperDto> CreatePaper(CreatePaperDto createPaperDto);
}