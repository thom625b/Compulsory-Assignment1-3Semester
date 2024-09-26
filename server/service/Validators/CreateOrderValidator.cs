using FluentValidation;
using service.Transfermodels.Request;

namespace service.Validators;

public class CreateOrderValidator : AbstractValidator<CreateOrderDto>
{
    public CreateOrderValidator()
    {
        RuleFor(o => o.TotalAmount).GreaterThan(0);
    }
}