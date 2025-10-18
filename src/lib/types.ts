export interface ProjectLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface ProjectSection {
  title: string;
  items: string[];
}

export interface ProjectData {
  id: string;
  name: string;
  slug: string;
  category: string;
  city: string;
  status: string;
  summary: string;
  description: string;
  heroImage: string;
  thumbnail: string;
  tags: string[];
  highlights: string[];
  technicalSheet: ProjectSection[];
  gallery: string[];
  location: ProjectLocation;
}

export interface FilterState {
  category: string[];
  city: string[];
  status: string[];
  search: string;
}
