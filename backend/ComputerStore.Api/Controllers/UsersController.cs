using ComputerStore.Api.Data;
using ComputerStore.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _db;
    public UsersController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<List<User>> GetAll() => await _db.Users.ToListAsync();

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] User user)
    {
        if (await _db.Users.AnyAsync(u => u.Username == user.Username))
            return BadRequest("Пользователь уже существует");

        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return Ok(user);
    }
}