namespace ComputerStore.Api.Models;

public class Sale
{
    public int Id { get; set; }
    public int SellerId { get; set; }
    public Seller Seller { get; set; } = null!;
    public DateTime SaleDate { get; set; }
    public decimal TotalAmount { get; set; }

    public List<SaleItem> Items { get; set; } = new();
}
