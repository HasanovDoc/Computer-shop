using ComputerStore.Api.Data;
using ComputerStore.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ComputerStore.Api.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<List<Product>> GetAll()
    {
        return await _db.Products.Include(x => x.ProductType).ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Create(Product product)
    {
        _db.Products.Add(product);
        await _db.SaveChangesAsync();
        return Ok(product);
    }
}
