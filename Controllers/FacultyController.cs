using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FacultyApi.Data;
using FacultyApi.Models;

namespace FacultyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FacultyController : ControllerBase
{
  private readonly AppDbContext _context;

  public FacultyController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Faculty>>> GetFacultiesWithPublications()
  {
    // Eager load individual publications linked to each faculty member
    var faculties = await _context.Faculties
        .Include(f => f.Publications)
        .AsNoTracking()
        .ToListAsync();

    return Ok(faculties);
  }
}
