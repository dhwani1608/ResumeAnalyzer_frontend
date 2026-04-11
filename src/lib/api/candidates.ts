const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function fetchCandidates() {
  const res = await fetch(`${API_URL}/candidates`);
  if (!res.ok) throw new Error('Failed to fetch candidates');
  return res.json();
}

export async function fetchCandidateSkills(id: string) {
  const res = await fetch(`${API_URL}/candidates/${id}/skills`);
  if (!res.ok) throw new Error('Failed to fetch candidate skills');
  return res.json();
}
