using HelpDeskPro.Application.DTOs.Tickets;
using HelpDeskPro.Application.Interfaces;
using HelpDeskPro.Domain.Entities;

namespace HelpDeskPro.Application.Services;

public class TicketService : ITicketService
{
    private readonly ITicketRepository _ticketRepository;
    private readonly ITicketValidationRepository _ticketValidationRepository;
    private readonly ITicketHistoryRepository _ticketHistoryRepository;

    public TicketService(
        ITicketRepository ticketRepository,
        ITicketValidationRepository ticketValidationRepository,
        ITicketHistoryRepository ticketHistoryRepository)
    {
        _ticketRepository = ticketRepository;
        _ticketValidationRepository = ticketValidationRepository;
        _ticketHistoryRepository = ticketHistoryRepository;
    }

    public async Task<List<TicketListDto>> GetTicketsAsync()
    {
        var tickets = await _ticketRepository.GetAllAsync();

        return tickets.Select(MapToDto).ToList();
    }

    public async Task<TicketListDto?> GetTicketByIdAsync(int id)
    {
        var ticket = await _ticketRepository.GetByIdAsync(id);

        if (ticket is null)
        {
            return null;
        }

        return MapToDto(ticket);
    }

    public async Task<TicketListDto> CreateTicketAsync(CreateTicketDto dto)
    {
        if (!await _ticketValidationRepository.UserExistsAsync(dto.UserId))
        {
            throw new ArgumentException(
                "El usuario indicado no existe o está inactivo.");
        }

        if (!await _ticketValidationRepository.CategoryExistsAsync(dto.CategoryId))
        {
            throw new ArgumentException(
                "La categoría indicada no existe o está inactiva.");
        }

        if (!await _ticketValidationRepository.PriorityExistsAsync(dto.PriorityId))
        {
            throw new ArgumentException(
                "La prioridad indicada no existe.");
        }

        var ticket = new Ticket
        {
            TicketNumber = "TEMP",
            Title = dto.Title.Trim(),
            Description = dto.Description.Trim(),
            UserId = dto.UserId,
            CategoryId = dto.CategoryId,
            PriorityId = dto.PriorityId,
            Status = "NUEVO",
            CreatedAt = DateTime.Now
        };

        var createdTicket = await _ticketRepository.AddAsync(ticket);

        createdTicket.TicketNumber = $"HD-{createdTicket.Id:D6}";
        createdTicket.UpdatedAt = DateTime.Now;

        await _ticketRepository.UpdateAsync(createdTicket);

        var ticketWithRelations =
            await _ticketRepository.GetByIdAsync(createdTicket.Id);

        return MapToDto(ticketWithRelations!);
    }

    public async Task<TicketListDto?> UpdateStatusAsync(
        int id,
        UpdateTicketStatusDto dto)
    {
        var ticket = await _ticketRepository.GetByIdAsync(id);

        if (ticket is null)
        {
            return null;
        }

        var allowedStatuses = new[]
        {
            "NUEVO",
            "ASIGNADO",
            "EN_PROCESO",
            "EN_ESPERA",
            "RESUELTO",
            "CERRADO",
            "REABIERTO"
        };

        var newStatus = dto.Status.Trim().ToUpper();

        if (!allowedStatuses.Contains(newStatus))
        {
            throw new ArgumentException(
                "El estado indicado no es válido.");
        }

        if (!await _ticketValidationRepository.UserExistsAsync(dto.UserId))
        {
            throw new ArgumentException(
                "El usuario que realiza el cambio no existe o está inactivo.");
        }

        var oldStatus = ticket.Status;

        if (oldStatus == newStatus)
        {
            throw new ArgumentException(
                "El ticket ya se encuentra en ese estado.");
        }

        ticket.Status = newStatus;
        ticket.UpdatedAt = DateTime.Now;

        if (newStatus == "RESUELTO")
        {
            ticket.ResolvedAt = DateTime.Now;
        }

        if (newStatus == "CERRADO")
        {
            ticket.ClosedAt = DateTime.Now;
        }

        if (newStatus == "REABIERTO")
        {
            ticket.ResolvedAt = null;
            ticket.ClosedAt = null;
        }

        await _ticketRepository.UpdateAsync(ticket);

        await _ticketHistoryRepository.AddAsync(
            ticket.Id,
            dto.UserId,
            "CAMBIO_ESTADO",
            oldStatus,
            newStatus);

        return await GetTicketByIdAsync(id);
    }
    public async Task<List<TicketHistoryDto>> GetTicketHistoryAsync(int ticketId)
    {
        var history = await _ticketHistoryRepository
            .GetByTicketIdAsync(ticketId);

        return history.Select(h => new TicketHistoryDto
        {
            Id = h.Id,
            TicketId = h.TicketId,
            Usuario = h.User.Name,
            Action = h.Action,
            OldValue = h.OldValue,
            NewValue = h.NewValue,
            CreatedAt = h.CreatedAt
        }).ToList();
    }
    private static TicketListDto MapToDto(Ticket ticket)
    {
        return new TicketListDto
        {
            Id = ticket.Id,
            TicketNumber = ticket.TicketNumber,
            Title = ticket.Title,
            Description = ticket.Description,
            Usuario = ticket.User.Name,
            Categoria = ticket.Category.Name,
            Prioridad = ticket.Priority.Name,
            Status = ticket.Status,
            CreatedAt = ticket.CreatedAt,
            UpdatedAt = ticket.UpdatedAt,
            ResolvedAt = ticket.ResolvedAt,
            ClosedAt = ticket.ClosedAt
        };
    }
}