using DataAccess.Models;

namespace service.Transfermodels.Request;

public class UpdatePaperDto
{
    public int Id { get; set; }
    public bool Discontinued { get; set; }
    public int Stock { get; set; }

    public void UpdatePaper(Paper paper)
    {
        paper.Discontinued = Discontinued;
        paper.Stock = Stock;
    }
    
}