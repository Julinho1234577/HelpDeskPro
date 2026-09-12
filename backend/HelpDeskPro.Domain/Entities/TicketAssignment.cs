namespace HelpDeskPro.Domain.Entities;

public class TicketAssignment
{
    public int Id { get; set; }

    public int TicketId { get; set; }

    public int TechnicianId { get; set; }

    public DateTime AssignedAt { get; set; }

    public DateTime? UnassignedAt { get; set; }

    public bool IsActive { get; set; } = true;

    public Ticket Ticket { get; set; } = null!;

    public User Technician { get; set; } = null!;
}