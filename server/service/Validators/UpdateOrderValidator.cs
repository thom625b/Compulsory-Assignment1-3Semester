using FluentValidation;
using service.Transfermodels.Request;

namespace service.Validators;

public class UpdateOrderValidator : AbstractValidator<UpdateOrderDto>
{
    public UpdateOrderValidator()
    {
        RuleFor(o => o.TotalAmount).GreaterThan(0);
        RuleFor(o => o.DeliveryDate).NotEmpty();
    }
}