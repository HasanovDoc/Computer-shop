using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ComputerStore.Api.Data;
using ComputerStore.Api.Models;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;

    public AuthController(AppDbContext db) => _db = db;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == req.Username && u.PasswordHash == req.Password);
        if (user == null) return Unauthorized();

        return Ok(new { token = "fake-jwt-token", role = user.Role, username = user.Username });
    }
}

public record LoginRequest(string Username, string Password);