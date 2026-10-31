export interface EventItem {
  Id: string;
  Name: string;
  Location: string;
  EvdTentImage: string;
}

export interface EventsResponse {
  Events: {
    Event: EventItem | EventItem[]; // Handles both a single object or an array
  };
}
