using System.Xml.Serialization;

namespace FacultyApi.Extensions;

public static class XmlResultExtensions
{
  public static IResult Xml<T>(this IResultExtensions _, T result)
  {
    return new XmlResult<T>(result);
  }
}

public class XmlResult<T> : IResult
{
  private readonly T _result;

  public XmlResult(T result)
  {
    _result = result;
  }

  public async Task ExecuteAsync(HttpContext httpContext)
  {
    var serializer = new XmlSerializer(typeof(T));
    using var memoryStream = new MemoryStream();
    serializer.Serialize(memoryStream, _result);

    memoryStream.Position = 0;
    httpContext.Response.ContentType = "application/xml";
    await memoryStream.CopyToAsync(httpContext.Response.Body);
  }
}
