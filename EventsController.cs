using Microsoft.AspNetCore.Mvc;
using System.Xml.Serialization;
using Events.Models;

namespace YourProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        // Inject HttpClientFactory via constructor
        public EventsController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("fetch-external")]
        public async Task<IActionResult> GetExternalEvents()
        {
            string xmlUrl = "https://community.rotman.utoronto.ca/events/services/apexrest/api/events"; // Replace with your actual external URL
            
            try
            {
                // 1. Create client and fetch the raw XML string
                var client = _httpClientFactory.CreateClient();
                var response = await client.GetAsync(xmlUrl);

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, "Failed to retrieve external data.");
                }

                string xmlContent = await response.Content.ReadAsStringAsync();

                // 2. Deserialize the XML string into C# objects
                var serializer = new XmlSerializer(typeof(EventDataset));
                using (var reader = new StringReader(xmlContent))
                {
                    var result = (EventDataset?)serializer.Deserialize(reader);
                    
                    if (result == null || result.Events == null)
                    {
                        return NotFound("No events found in the XML dataset.");
                    }

                    // 3. Return the parsed collection (automatically serialized to JSON by ASP.NET Core)
                    return Ok(result.Events);
                }
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(503, $"External service unavailable: {ex.Message}");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest($"Failed to parse XML schema: {ex.Message}");
            }
        }
    }
}
