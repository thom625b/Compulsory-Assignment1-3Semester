using FluentValidation;
using service.Transfermodels.Request;

namespace service.Validators;

public class UpdatePaperValidator : AbstractValidator<UpdatePaperDto>
{
    public UpdatePaperValidator()
    {
        RuleFor(p => p.Stock).GreaterThan(0);
    }
}