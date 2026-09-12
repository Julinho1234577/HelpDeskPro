
namespace HelpDeskPro.Application.DTOs.Tickets;

public class UpdateTicketStatusDto
{
    public string Status { get; set; } = string.Empty;
    public int UserId { get; set; }
}

