using ComputerStore.Api.Data;
using ComputerStore.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ComputerStore.Api.Controllers;

[ApiController]
[Route("api/product-types")]
public class ProductTypesController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProductTypesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<ProductType>>> GetAll()
    {
        return await _db.ProductTypes.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<ProductType>> Create([FromBody] ProductType type)
    {
        _db.ProductTypes.Add(type);
        await _db.SaveChangesAsync();
        return Ok(type);
    }
}