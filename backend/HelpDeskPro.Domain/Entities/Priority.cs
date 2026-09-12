namespace HelpDeskPro.Domain.Entities;

public class Priority
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public int Level { get; set; }

    public int ResponseTimeMinutes { get; set; }

    public int ResolutionTimeMinutes { get; set; }

    public ICollection<Ticket> Tickets { get; set; } =
        new List<Ticket>();
}