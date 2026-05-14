// types/index.ts

export interface Candidate {
  id: string;
  name: string;
  photo_url: string;
  vision: string;
  mission: string;
  position: 'chairman' | 'vice_1' | 'vice_2'; // Kolom baru
  sequence_number: number;
}

export interface Voter {
  id: string;
  token: string;
  is_used: boolean;
  created_at: string;
}

export interface Vote {
  id: string;
  voter_id: string;
  candidate_id: string;
  created_at: string;
}


