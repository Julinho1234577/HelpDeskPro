using HelpDeskPro.Application.Interfaces;
using HelpDeskPro.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskPro.Infrastructure.Repositories;

public class TicketValidationRepository : ITicketValidationRepository
{
    private readonly AppDbContext _context;

    public TicketValidationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> UserExistsAsync(int userId)
    {
        return await _context.Users
            .AnyAsync(u => u.Id == userId && u.IsActive);
    }

    public async Task<bool> CategoryExistsAsync(int categoryId)
    {
        return await _context.Categories
            .AnyAsync(c => c.Id == categoryId && c.IsActive);
    }

    public async Task<bool> PriorityExistsAsync(int priorityId)
    {
        return await _context.Priorities
            .AnyAsync(p => p.Id == priorityId);
    }
}
