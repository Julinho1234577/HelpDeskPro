using HelpDeskPro.Application.DTOs.Tickets;

namespace HelpDeskPro.Application.Services;

public interface ITicketService
{
    Task<List<TicketListDto>> GetTicketsAsync();

    Task<TicketListDto?> GetTicketByIdAsync(int id);

    Task<TicketListDto> CreateTicketAsync(CreateTicketDto dto);

    Task<TicketListDto?> UpdateStatusAsync(
        int id,
        UpdateTicketStatusDto dto);

    Task<List<TicketHistoryDto>> GetTicketHistoryAsync(int ticketId);
}