namespace ComputerStore.Api.Models;

public class SaleItem
{
    public int SaleId { get; set; }
    public Sale Sale { get; set; } = null!;

    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;

    public decimal Price { get; set; }
}
