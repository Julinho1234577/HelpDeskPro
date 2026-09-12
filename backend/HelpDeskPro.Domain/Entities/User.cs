namespace HelpDeskPro.Domain.Entities;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public int RoleId { get; set; }

    public int? DepartmentId { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public Role Role { get; set; } = null!;

    public Department? Department { get; set; }

    public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();

    public ICollection<TicketComment> TicketComments { get; set; } =
        new List<TicketComment>();

    public ICollection<TicketHistory> TicketHistories { get; set; } =
        new List<TicketHistory>();
}