using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FacultyApi.Models;

[Table("Fac_Publication")]
public class Publication
{
  [Key]
  [Column("PublicationsID")]
  public int Id { get; set; }

  [Required]
  public string? Title { get; set; }

  public int? YearPublished { get; set; }

  // Foreign Key
  public string? FacultyId { get; set; }

  [JsonIgnore] // Prevents object graph loops during serialization
  [ForeignKey("FacultyId")]
  public Faculty? Faculty { get; set; }
}
