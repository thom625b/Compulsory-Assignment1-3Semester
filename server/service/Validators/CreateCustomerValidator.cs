using FluentValidation;
using service.Transfermodels.Request;

namespace service.Validators;

public class CreateCustomerValidator : AbstractValidator<CreateCustomerDto>
{
        public CreateCustomerValidator()
        {
            RuleFor(c => c.Name).NotEmpty().MaximumLength(50);
            RuleFor(c => c.Address).NotEmpty().MaximumLength(50);
            RuleFor(c => c.Email)
                .NotEmpty()
                .MaximumLength(50)
                .EmailAddress();
            
            RuleFor(c => c.Phone)
                .NotEmpty()
                .Matches(@"^\+?[1-9]\d{1,14}$") // E.164 international phone number format
                .WithMessage("Phone number must be valid and in the E.164 format (e.g., +123456789).");
        }
}