using HelpDeskPro.Application.Interfaces;
using HelpDeskPro.Domain.Entities;
using HelpDeskPro.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskPro.Infrastructure.Repositories;

public class TicketHistoryRepository : ITicketHistoryRepository
{
    private readonly AppDbContext _context;

    public TicketHistoryRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        int ticketId,
        int userId,
        string action,
        string? oldValue,
        string? newValue)
    {
        var history = new TicketHistory
        {
            TicketId = ticketId,
            UserId = userId,
            Action = action,
            OldValue = oldValue,
            NewValue = newValue,
            CreatedAt = DateTime.Now
        };

        _context.TicketHistory.Add(history);

        await _context.SaveChangesAsync();
    }

    public async Task<List<TicketHistory>> GetByTicketIdAsync(int ticketId)
    {
        return await _context.TicketHistory
            .Include(h => h.User)
            .Where(h => h.TicketId == ticketId)
            .OrderByDescending(h => h.CreatedAt)
            .ToListAsync();
    }
}