using HelpDeskPro.Application.DTOs.Tickets;
using HelpDeskPro.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace HelpDeskPro.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public TicketsController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    // GET: api/Tickets
    [HttpGet]
    public async Task<IActionResult> GetTickets()
    {
        var tickets = await _ticketService.GetTicketsAsync();

        return Ok(tickets);
    }

    // GET: api/Tickets/2003
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetTicketById(int id)
    {
        var ticket = await _ticketService.GetTicketByIdAsync(id);

        if (ticket is null)
        {
            return NotFound(new
            {
                message = $"No se encontró el ticket con ID {id}."
            });
        }

        return Ok(ticket);
    }

    // GET: api/Tickets/2003/history
    [HttpGet("{id:int}/history")]
    public async Task<IActionResult> GetTicketHistory(int id)
    {
        var ticket = await _ticketService.GetTicketByIdAsync(id);

        if (ticket is null)
        {
            return NotFound(new
            {
                message = $"No se encontró el ticket con ID {id}."
            });
        }

        var history = await _ticketService.GetTicketHistoryAsync(id);

        return Ok(history);
    }

    // POST: api/Tickets
    [HttpPost]
    public async Task<IActionResult> CreateTicket(
        [FromBody] CreateTicketDto dto)
    {
        try
        {
            var ticket = await _ticketService.CreateTicketAsync(dto);

            return CreatedAtAction(
                nameof(GetTicketById),
                new { id = ticket.Id },
                ticket);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }

    // PUT: api/Tickets/2003/status
    [HttpPut("{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(
        int id,
        [FromBody] UpdateTicketStatusDto dto)
    {
        try
        {
            var ticket = await _ticketService.UpdateStatusAsync(id, dto);

            if (ticket is null)
            {
                return NotFound(new
                {
                    message = $"No se encontró el ticket con ID {id}."
                });
            }

            return Ok(ticket);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }
}