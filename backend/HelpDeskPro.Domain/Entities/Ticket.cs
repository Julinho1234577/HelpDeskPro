namespace HelpDeskPro.Domain.Entities;

public class Ticket
{
    public int Id { get; set; }

    public string TicketNumber { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int UserId { get; set; }

    public int CategoryId { get; set; }

    public int PriorityId { get; set; }

    public string Status { get; set; } = "NUEVO";

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? ResolvedAt { get; set; }

    public DateTime? ClosedAt { get; set; }

    public User User { get; set; } = null!;

    public Category Category { get; set; } = null!;

    public Priority Priority { get; set; } = null!;

    public ICollection<TicketAssignment> Assignments { get; set; } =
        new List<TicketAssignment>();

    public ICollection<TicketComment> Comments { get; set; } =
        new List<TicketComment>();

    public ICollection<TicketHistory> History { get; set; } =
        new List<TicketHistory>();
}