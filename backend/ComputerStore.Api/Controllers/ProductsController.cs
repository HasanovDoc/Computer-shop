using ComputerStore.Api.Data;
using ComputerStore.Api.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProductsController(AppDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Product product)
    {
        product.IsSold = false;
        
        if (string.IsNullOrEmpty(product.Specs)) product.Specs = "{}";

        _db.Products.Add(product);
        await _db.SaveChangesAsync();
        return Ok(product);
    }
}