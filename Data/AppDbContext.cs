using Microsoft.EntityFrameworkCore;
using FacultyApi.Models;

namespace FacultyApi.Data;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

  public DbSet<Faculty> Faculties { get; set; }
  public DbSet<Publication> Publications { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    // Explicit configuration for relationships
    modelBuilder.Entity<Publication>()
        .HasOne(p => p.Faculty)
        .WithMany(f => f.Publications)
        .HasForeignKey(p => p.FacultyId);

    base.OnModelCreating(modelBuilder);
  }
}
