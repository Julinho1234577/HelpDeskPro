using HelpDeskPro.Application.Interfaces;
using HelpDeskPro.Domain.Entities;
using HelpDeskPro.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskPro.Infrastructure.Repositories;

public class TicketRepository : ITicketRepository
{
    private readonly AppDbContext _context;

    public TicketRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Ticket>> GetAllAsync()
    {
        return await _context.Tickets
            .AsNoTracking()
            .Include(t => t.User)
            .Include(t => t.Category)
            .Include(t => t.Priority)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task<Ticket?> GetByIdAsync(int id)
    {
        return await _context.Tickets
            .AsNoTracking()
            .Include(t => t.User)
            .Include(t => t.Category)
            .Include(t => t.Priority)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<Ticket> AddAsync(Ticket ticket)
    {
        _context.Tickets.Add(ticket);

        await _context.SaveChangesAsync();

        return ticket;
    }
    public async Task UpdateAsync(Ticket ticket)
    {
        _context.Tickets.Update(ticket);

        await _context.SaveChangesAsync();
    }
}
