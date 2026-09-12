using HelpDeskPro.Domain.Entities;

namespace HelpDeskPro.Application.Interfaces;

public interface ITicketValidationRepository
{
    Task<bool> UserExistsAsync(int userId);
    Task<bool> CategoryExistsAsync(int categoryId);
    Task<bool> PriorityExistsAsync(int priorityId);
}
