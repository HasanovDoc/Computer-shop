using ComputerStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ComputerStore.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductType> ProductTypes => Set<ProductType>();
    public DbSet<Build> Builds => Set<Build>();
    public DbSet<BuildItem> BuildItems => Set<BuildItem>();
    public DbSet<Seller> Sellers => Set<Seller>();
    public DbSet<Sale> Sales => Set<Sale>();
    public DbSet<SaleItem> SaleItems => Set<SaleItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BuildItem>()
            .HasKey(x => new { x.BuildId, x.ProductId });

        modelBuilder.Entity<SaleItem>()
            .HasKey(x => new { x.SaleId, x.ProductId });
    }
}
