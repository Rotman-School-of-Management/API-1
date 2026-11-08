using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FacultyApi.Models;

[Table("Fac_Faculty")]
public class Faculty
{
  [Key]
  [Column("FacultyID")] // Adjust name to your actual PK column name
  public string FacultyID { get; set; } = string.Empty;

  [Required]
  public string LName { get; set; } = string.Empty;

  public string? Division { get; set; } 

  // Navigation property for 1-to-Many Relationship
  public ICollection<Publication> Publications { get; set; } = new List<Publication>();
}
