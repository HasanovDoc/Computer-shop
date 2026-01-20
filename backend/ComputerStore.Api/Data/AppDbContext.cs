using Microsoft.EntityFrameworkCore;

namespace ComputerStore.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // DbSet'ы потом добавим
}
