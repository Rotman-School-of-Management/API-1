using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Microsoft.Data.SqlClient;

public class FacultyDataService
{
  private readonly string _connectionString;

  public FacultyDataService(string connectionString)
  {
    _connectionString = connectionString;
  }

  public async Task<string> GetFacultyPublicationsAsXmlAsync()
  {
    // 1. Define SQL querying hierarchical architecture using FOR XML
    const string sqlQuery = @"
            SELECT 
                id AS [Id],
                FacultyID AS [FacultyID],
                LName AS [LastName], FName AS [FirstName], Email,
                Division AS [Division],
                (
                    SELECT 
                       REPLACE(REPLACE(Title, CHAR(0x000C), ' '), CHAR(0x0000), ' ') AS [Title],
                        YearPublished AS [YearPublished]
                    FROM Fac_Publication
                    WHERE FacultyID = f.FacultyID
                    FOR XML PATH('Publication'), TYPE
                ) AS [Publications]
            FROM Fac_Faculty f
            FOR XML PATH('Faculty'), ROOT('FacultyData')";

    using var connection = new SqlConnection(_connectionString);
    using var command = new SqlCommand(sqlQuery, connection);

    await connection.OpenAsync();

    // 2. Execute SQL command and read its streaming XML payload
    using var reader = await command.ExecuteXmlReaderAsync();

    // 3. Format the XML string beautifully with explicit indentation
    var settings = new XmlWriterSettings
    {
      OmitXmlDeclaration = false,
      Indent = true,
      IndentChars = "  ",
      Encoding = Encoding.UTF8
    };

    using var stringWriter = new StringWriter();
    using var xmlWriter = XmlWriter.Create(stringWriter, settings);

    xmlWriter.WriteNode(reader, true);
    xmlWriter.Flush();

    return stringWriter.ToString();
  }
}
