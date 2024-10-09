using DataAccess.Models;
using FluentValidation;
using service.Transfermodels.Request;

namespace service.Validators;

public class CreatePaperValidator : AbstractValidator<CreatePaperDto>
{
    public CreatePaperValidator()
    {
        RuleFor(p => p.Name).NotEmpty().MaximumLength(50);
        RuleFor(p => p.Stock).GreaterThanOrEqualTo(0);
        RuleFor(p => p.Price).GreaterThan(0.0);
    }
}