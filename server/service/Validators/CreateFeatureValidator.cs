using FluentValidation;
using service.Transfermodels.Request;

namespace service.Validators;

public class CreateFeatureValidator : AbstractValidator<CreateFeatureDto>
{
    public CreateFeatureValidator()
    {
        RuleFor(p => p.Name).NotEmpty().MaximumLength(50);
    }
}