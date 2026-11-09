export interface Publication {
  Title: string;
  YearPublished: string;
}

export interface Faculty {
 '@attributes'?: { Id: number }; // Captures <Faculty Id="272">
  FacultyID: string;
  LastName: string;
  Division: string;
  Publications: {
    Publication: Publication | Publication[]; // Can be an object or an array depending on XML structure
  };
}

export interface FacultyDataResponse {
  FacultyData: {
    Faculty: Faculty;
  };
}
