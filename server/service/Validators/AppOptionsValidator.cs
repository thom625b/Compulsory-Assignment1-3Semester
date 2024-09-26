using FluentValidation;
using service;

namespace Service.Validators;

public class AppOptionsValidator : AbstractValidator<AppOptions>
{
    public AppOptionsValidator()
    {
        RuleFor(x => x.Dunderdb).NotEmpty();
    }
    
}