using System.Xml.Serialization;

namespace Events.Models
{
    [XmlRoot("Events")]
    public class EventDataset
    {
        [XmlElement("Event")]
        public List<EventModel> Events { get; set; } = new List<EventModel>();
    }

    public class EventModel
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
    }
}
