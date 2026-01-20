namespace ComputerStore.Api.Models;

public class Build
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public List<BuildItem> Items { get; set; } = new();
}
