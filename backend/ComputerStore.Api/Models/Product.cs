using System.Text.Json;

namespace ComputerStore.Api.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int ProductTypeId { get; set; }
    public ProductType ProductType { get; set; } = null!;

    public decimal PriceBuy { get; set; }
    public decimal PriceSell { get; set; }

    public string Specs { get; set; } = "{}"; // JSON
    public bool IsSold { get; set; }
}
