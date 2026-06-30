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

export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  
  if (!res.ok) throw new Error('Failed to upload resume');
  return res.json();
}

export async function analyzeCandidate(candidateId: string) {
  const res = await fetch(`${API_URL}/candidates/${candidateId}/analyze`, {
    method: 'POST',
  });
  
  if (!res.ok) throw new Error('Failed to analyze candidate');
  return res.json();
}

export async function getJobRecommendations(candidateId: string) {
  const res = await fetch(`${API_URL}/candidates/${candidateId}/recommendations`);
  if (!res.ok) throw new Error('Failed to get recommendations');
  return res.json();
}

export const API_SECRET = "super-secret-key-123"; // TODO: move to env
