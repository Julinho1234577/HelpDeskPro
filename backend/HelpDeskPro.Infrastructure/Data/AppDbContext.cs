using HelpDeskPro.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskPro.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Role> Roles => Set<Role>();

    public DbSet<Department> Departments => Set<Department>();

    public DbSet<User> Users => Set<User>();

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Priority> Priorities => Set<Priority>();

    public DbSet<Ticket> Tickets => Set<Ticket>();

    public DbSet<TicketAssignment> TicketAssignments => Set<TicketAssignment>();

    public DbSet<TicketComment> TicketComments => Set<TicketComment>();

    public DbSet<TicketHistory> TicketHistory => Set<TicketHistory>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // =============================================
        // Role
        // =============================================

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Roles");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(x => x.Description)
                .HasMaxLength(200);

            entity.HasIndex(x => x.Name)
                .IsUnique();
        });

        // =============================================
        // Department
        // =============================================

        modelBuilder.Entity<Department>(entity =>
        {
            entity.ToTable("Departments");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(x => x.Description)
                .HasMaxLength(200);

            entity.Property(x => x.IsActive)
                .HasDefaultValue(true);

            entity.HasIndex(x => x.Name)
                .IsUnique();
        });

        // =============================================
        // User
        // =============================================

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(x => x.Email)
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(x => x.PasswordHash)
                .HasMaxLength(500)
                .IsRequired();

            entity.Property(x => x.IsActive)
                .HasDefaultValue(true);

            entity.Property(x => x.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            entity.HasIndex(x => x.Email)
                .IsUnique();

            entity.HasOne(x => x.Role)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Department)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // =============================================
        // Category
        // =============================================

        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Categories");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(x => x.Description)
                .HasMaxLength(200);

            entity.Property(x => x.IsActive)
                .HasDefaultValue(true);

            entity.HasIndex(x => x.Name)
                .IsUnique();
        });

        // =============================================
        // Priority
        // =============================================

        modelBuilder.Entity<Priority>(entity =>
        {
            entity.ToTable("Priorities");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(x => x.Level)
                .IsRequired();

            entity.Property(x => x.ResponseTimeMinutes)
                .IsRequired();

            entity.Property(x => x.ResolutionTimeMinutes)
                .IsRequired();

            entity.HasIndex(x => x.Name)
                .IsUnique();
        });

        // =============================================
        // Ticket
        // =============================================

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.ToTable("Tickets");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.TicketNumber)
                .HasMaxLength(20)
                .IsRequired();

            entity.Property(x => x.Title)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(x => x.Description)
                .IsRequired();

            entity.Property(x => x.Status)
                .HasMaxLength(30)
                .IsRequired()
                .HasDefaultValue("NUEVO");

            entity.Property(x => x.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            entity.HasIndex(x => x.TicketNumber)
                .IsUnique();

            entity.HasOne(x => x.User)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Category)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Priority)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.PriorityId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // =============================================
        // TicketAssignment
        // =============================================

        modelBuilder.Entity<TicketAssignment>(entity =>
        {
            entity.ToTable("TicketAssignments");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.AssignedAt)
                .HasDefaultValueSql("GETDATE()");

            entity.Property(x => x.IsActive)
                .HasDefaultValue(true);

            entity.HasOne(x => x.Ticket)
                .WithMany(x => x.Assignments)
                .HasForeignKey(x => x.TicketId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(x => x.Technician)
                .WithMany()
                .HasForeignKey(x => x.TechnicianId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // =============================================
        // TicketComment
        // =============================================

        modelBuilder.Entity<TicketComment>(entity =>
        {
            entity.ToTable("TicketComments");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Comment)
                .IsRequired();

            entity.Property(x => x.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            entity.HasOne(x => x.Ticket)
                .WithMany(x => x.Comments)
                .HasForeignKey(x => x.TicketId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(x => x.User)
                .WithMany(x => x.TicketComments)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // =============================================
        // TicketHistory
        // =============================================

        modelBuilder.Entity<TicketHistory>(entity =>
        {
            entity.ToTable("TicketHistory");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Action)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(x => x.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            entity.HasOne(x => x.Ticket)
                .WithMany(x => x.History)
                .HasForeignKey(x => x.TicketId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(x => x.User)
                .WithMany(x => x.TicketHistories)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}