namespace ComputerStore.Api.Models;

public class BuildItem
{
    public int BuildId { get; set; }
    public Build Build { get; set; } = null!;

    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
}
