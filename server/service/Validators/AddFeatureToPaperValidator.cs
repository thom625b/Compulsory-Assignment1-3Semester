using FluentValidation;
using service.Transfermodels.Request;

namespace service.Validators;

public class AddFeatureToPaperValidator : AbstractValidator<FeaturesToPaperDto>
{
    public AddFeatureToPaperValidator()
    {
        RuleFor(f => f.FeatureStock)
            .GreaterThan(0)
            .WithMessage("Must have a stock over zero");
    }
}