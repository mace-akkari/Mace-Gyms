export interface PageProps {
  params: { id: string };
}

export interface Note {
  id: number;
  comment: string;
}

export interface Exercise {
  id: number;
  name: string;
  description: string;
  language: number;
  notes: Note[];
}
