using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();
builder.Services.AddControllers()
    .AddXmlSerializerFormatters(); // Enables XML formatting

// Add CORS to allow requests from the Angular app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));


app.UseCors("AllowAngularApp");

// Define a Minimal API endpoint returning a JSON string/object
app.MapGet("/api/message", async ([FromServices] HttpClient httpClient) =>
{
try
{
  // 1. Fetch data from the external API
  var message = await httpClient.GetAsync("https://community.rotman.utoronto.ca/events/services/apexrest/api/events");

    // 2. Ensure it returned a 2xx success code
    message.EnsureSuccessStatusCode();

  // 3. Read the content as a string or dynamic JSON object
  var content = await message.Content.ReadAsStringAsync();

  // 4. Return it using Content to preserve raw JSON, or deserialize it
  return Results.Content(content, "application/xml");

  }
  catch (Exception ex)
  {
    // Log your error here
    return Results.Problem($"Failed to fetch data: {ex.Message}", statusCode: 500);
  }
  // 1. Fetch the raw JSON string from the external API
  //string xmlString = await httpClient.GetStringAsync("https://community.rotman.utoronto.ca/events/services/apexrest/api/events");
  // var data = await httpClient.GetStringAsync("https://community.rotman.utoronto.ca/events/services/apexrest/api/events");
  // return Results.Ok(data);
  // 2. Return it directly as JSON content
  //return Results.Content(xmlString, contentType: "application/xml");
});
app.Run();
