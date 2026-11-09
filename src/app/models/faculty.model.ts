export interface FacPublication {
  PublicationsID: number;
  Title: string;
  YearPublished: number;
  FacultyID: string;
}

export interface FacFaculty {
  FacultyID: string;
  LName: string;
  Division: string;
  publications: FacPublication[];
}
