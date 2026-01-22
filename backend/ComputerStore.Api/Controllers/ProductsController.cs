using ComputerStore.Api.Data;
using ComputerStore.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
        [FromQuery] int? typeId, 
        [FromQuery] string? brand, 
        [FromQuery] string? freq, 
        [FromQuery] string? search)
    {
        var query = _db.Products.Include(p => p.ProductType).Where(p => !p.IsSold);

        if (typeId.HasValue) 
            query = query.Where(p => p.ProductTypeId == typeId);

        if (!string.IsNullOrEmpty(brand))
        {
            query = _db.Products.Include(p => p.ProductType);
            query = query.Where(p => p.Specs.Contains($"\"brand\":\"{brand}"));
        }

        if (!string.IsNullOrEmpty(freq))
        {
            query = _db.Products.Include(p => p.ProductType);
            query = query.Where(p => p.Specs.Contains($"{freq}"));
        }

        if (!string.IsNullOrEmpty(search))
            query = query.Where(p => p.Name.ToLower().Contains(search.ToLower()));

        return await query.ToListAsync();
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var products = await _db.Products.ToListAsync();

        var brands = products
            .Select(p => {
                try {
                    var json = string.IsNullOrWhiteSpace(p.Specs) ? "{}" : p.Specs;
                    using var doc = JsonDocument.Parse(json);
                    return doc.RootElement.TryGetProperty("brand", out var val) ? val.GetString() : null;
                } catch { return null; }
            })
            .Where(v => !string.IsNullOrEmpty(v))
            .Distinct()
            .OrderBy(v => v)
            .ToList();

        var freqs = products
            .Select(p => {
                try {
                    var json = string.IsNullOrWhiteSpace(p.Specs) ? "{}" : p.Specs;
                    using var doc = JsonDocument.Parse(json);
                    
                    if (doc.RootElement.TryGetProperty("freq_ghz", out var val))
                        return val.GetRawText(); 

                    return null;
                } catch { return null; }
            })
            .Where(v => !string.IsNullOrEmpty(v))
            .Distinct()
            .OrderBy(v => v)
            .ToList();

        return Ok(new { brands, freqs });
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