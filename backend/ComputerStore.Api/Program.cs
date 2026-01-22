using ComputerStore.Api.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

var host    = Environment.GetEnvironmentVariable("DB_HOST") ?? builder.Configuration["DB_HOST"];
var port    = Environment.GetEnvironmentVariable("DB_PORT") ?? builder.Configuration["DB_PORT"];
var db_name = Environment.GetEnvironmentVariable("DB_DATABASE") ?? builder.Configuration["DB_DATABASE"];
var user    = Environment.GetEnvironmentVariable("DB_USERNAME") ?? builder.Configuration["DB_USERNAME"];
var pass    = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? builder.Configuration["DB_PASSWORD"];

bool isProduction = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("RENDER"));
var sslMode = isProduction ? "Require" : "Disable";

var connectionString = $"Host={host};Port={port};Database={db_name};Username={user};Password={pass};SSL Mode={sslMode};Trust Server Certificate=true";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.MaxDepth = 64;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.Run();
