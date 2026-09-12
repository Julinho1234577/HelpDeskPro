using FluentValidation;
using HelpDeskPro.Application.DTOs.Tickets;

namespace HelpDeskPro.Application.Validators;

public class CreateTicketValidator : AbstractValidator<CreateTicketDto>
{
    public CreateTicketValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("El título es obligatorio.")
            .MaximumLength(200)
            .WithMessage("El título no puede superar los 200 caracteres.");

        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("La descripción es obligatoria.");

        RuleFor(x => x.UserId)
            .GreaterThan(0)
            .WithMessage("El usuario es obligatorio.");

        RuleFor(x => x.CategoryId)
            .GreaterThan(0)
            .WithMessage("La categoría es obligatoria.");

        RuleFor(x => x.PriorityId)
            .GreaterThan(0)
            .WithMessage("La prioridad es obligatoria.");
    }
}