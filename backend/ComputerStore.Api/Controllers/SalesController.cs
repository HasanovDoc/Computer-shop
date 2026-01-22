using ComputerStore.Api.Data;
using ComputerStore.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ComputerStore.Api.Controllers;

[ApiController]
[Route("api/sales")]
public class SalesController : ControllerBase
{
    private readonly AppDbContext _db;

    public SalesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("buy")]
    public async Task<IActionResult> Buy([FromBody] BuyRequest request)
    {
        var products = await _db.Products
            .Where(p => request.ProductIds.Contains(p.Id) && !p.IsSold)
            .ToListAsync();

        if (!products.Any()) return BadRequest("Товары недоступны");

        var seller = await _db.Sellers.FirstOrDefaultAsync() 
                     ?? new Seller { Name = "Системный продавец" };

        var sale = new Sale
        {
            Seller = seller,
            SaleDate = DateTime.UtcNow,
            TotalAmount = products.Sum(p => p.PriceSell),
            Items = products.Select(p => new SaleItem 
            { 
                Product = p, 
                Price = p.PriceSell 
            }).ToList()
        };

        foreach (var p in products) p.IsSold = true;

        _db.Sales.Add(sale);
        await _db.SaveChangesAsync();

        return Ok(new { success = true, totalAmount = sale.TotalAmount });
    }
}

public class BuyRequest
{
    public List<int> ProductIds { get; set; } = new();
}