using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Serialization;

namespace FacultyApi.Models;

[Table("Fac_Faculty")]
[XmlRoot("Faculty")] // Ensures the root element is named <Faculty>
public class Faculty
{
  [Key]
  [Column("FacultyID")]
  [XmlElement("Id")] // Forces serialization as <Id>value</Id>
  public string FacultyID { get; set; } = string.Empty;

  [Required]
  public string LName { get; set; } = string.Empty;

  public string? Division { get; set; }

  // Note: XmlSerializer cannot serialize interfaces like ICollection<T>.
  // Use List<Publication> or add [XmlIgnore] if you don't need it in XML.
  public List<Publication> Publications { get; set; } = new List<Publication>();
}
