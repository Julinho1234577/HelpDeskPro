using HelpDeskPro.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskPro.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    private readonly AppDbContext _context;

    public HealthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("database")]
    public async Task<IActionResult> Database()
    {
        var canConnect = await _context.Database.CanConnectAsync();

        return Ok(new
        {
            database = "HelpDeskProDB",
            connected = canConnect
        });
    }
}
