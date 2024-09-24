using FluentValidation;
using service.Transfermodels.Request;

namespace service.Validators;

public class CreatePropertyValidator : AbstractValidator<CreatePropertyDto>
{
    public CreatePropertyValidator()
    {
        RuleFor(p => p.Name).NotEmpty().MaximumLength(50);
    }
}