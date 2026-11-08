using Microsoft.EntityFrameworkCore;
using FacultyApi.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Configure CORS for Angular App (assuming default localhost port 4200)
builder.Services.AddCors(options => {
  options.AddPolicy("AngularCorsPolicy", policy => {
    policy.WithOrigins("http://localhost:4200")
          .AllowAnyHeader()
          .AllowAnyMethod();
  });
});

// 2. Register Database Context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddOpenApi(); // .NET 10.0 OpenAPI feature

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AngularCorsPolicy");
app.UseAuthorization();
app.MapControllers();

app.Run();
