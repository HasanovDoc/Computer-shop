using ComputerStore.Api.Data;
using ComputerStore.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _db.Products
            .Include(p => p.ProductType)
            .Where(p => !p.IsSold)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Product product)
    {
        ModelState.Remove("ProductType");

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        product.IsSold = false;
        
        if (string.IsNullOrEmpty(product.Specs)) 
        {
            product.Specs = "{}";
        }

        _db.Products.Add(product);
        await _db.SaveChangesAsync();
        
        var createdProduct = await _db.Products
            .Include(p => p.ProductType)
            .FirstOrDefaultAsync(p => p.Id == product.Id);

        return Ok(createdProduct);
    }
}