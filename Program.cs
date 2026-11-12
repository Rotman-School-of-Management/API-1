using FacultyApi.Data;
using FacultyApi.Extensions;
using FacultyApi.Models;
using Microsoft.EntityFrameworkCore;
using FacultyApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1. Enable CORS policy
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngular", policy =>
  {
    //policy.WithOrigins("http://localhost:4200", "https://fmgmt-2.rotman.utoronto.ca") 
      policy.WithOrigins("http://localhost:4200") 
          .AllowAnyHeader()
          .AllowAnyMethod();
  });
});

// Grab connection string from appsettings.json
string connString = builder.Configuration.GetConnectionString("DefaultConnection")
                    ?? "Server=SQL-00\\ROTMAN;Database=WWW;User Id=wwwUser;Password=bEst%23$;TrustServerCertificate=True;;";

builder.Services.AddSingleton(new FacultyDataService(connString));

var app = builder.Build();

app.MapGet("/api/faculty", async (FacultyDataService dataService) =>
{
  try
  {
    string xmlOutput = await dataService.GetFacultyPublicationsAsXmlAsync();
    return Results.Content(xmlOutput, "application/xml", Encoding.UTF8);
  }
  catch (Exception ex)
  {
    return Results.Problem($"Database transaction failed: {ex.Message}");
  }
});



// APPROACH 1: Single endpoint respecting the 'Accept' header
//app.MapGet("/api/data", async (HttpRequest request, FacultyDataService dataService) =>
//{
//  var data = await dataService.GetFacultyPublicationsAsXmlAsync();

//  if (request.Headers.Accept.Any(h => h != null && h.Contains("application/xml", StringComparison.OrdinalIgnoreCase)))
//  {
//    return Results.Extensions.Xml(data);
//  }

//  return Results.Ok(data); // Defaults to JSON
//});

// APPROACH 2: Explicit endpoints for JSON and XML
//app.MapGet("/api/data/json", async (FacultyDataService dataService) =>
//{
//  var data = await dataService.GetFacultyPublicationsAsXmlAsync();
//  return Results.Ok(data);
//});

//app.MapGet("/api/data/xml", async (FacultyDataService dataService) =>
//{
//  var data = await dataService.GetFacultyPublicationsAsXmlAsync();
//  return Results.Extensions.Xml(data);
//});

//app.MapGet("/api/data/json", async (FacultyDataService dataService) =>
//{
//  string xmlString = await dataService.GetFacultyPublicationsAsXmlAsync();

//  XmlDocument doc = new XmlDocument();
//  doc.LoadXml(xmlString);

//  string jsonString = JsonConvert.SerializeXmlNode(doc);

//  // Return as application/json content
//  return Results.Content(jsonString, "application/json");
//});







app.UseHttpsRedirection();

// 2. Apply CORS before Authorization
app.UseCors("AllowAngular");




app.Run();
