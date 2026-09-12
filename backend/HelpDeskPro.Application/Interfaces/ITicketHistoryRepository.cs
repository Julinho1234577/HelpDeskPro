using HelpDeskPro.Domain.Entities;

namespace HelpDeskPro.Application.Interfaces;

public interface ITicketHistoryRepository
{
    Task AddAsync(
        int ticketId,
        int userId,
        string action,
        string? oldValue,
        string? newValue);

    Task<List<TicketHistory>> GetByTicketIdAsync(int ticketId);
}