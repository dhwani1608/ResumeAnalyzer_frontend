const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

function getHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('talent_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
}

export async function fetchJobs() {
  const res = await fetch(`${API_URL}/jobs`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export async function fetchJob(id: string) {
  const res = await fetch(`${API_URL}/jobs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch job');
  return res.json();
}

export async function fetchJobCandidates(id: string) {
  const res = await fetch(`${API_URL}/jobs/${id}/candidates`);
  if (!res.ok) throw new Error('Failed to fetch job candidates');
  return res.json();
}

export async function fetchCandidate(id: string) {
  const res = await fetch(`${API_URL}/candidates/${id}`);
  if (!res.ok) throw new Error('Failed to fetch candidate');
  return res.json();
}

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

export async function fetchTaxonomy() {
  const res = await fetch(`${API_URL}/skills/taxonomy`);
  if (!res.ok) throw new Error('Failed to fetch taxonomy');
  return res.json();
}

export async function uploadResume(file: File, jobId?: string) {
  const formData = new FormData();
  formData.append('file', file);
  if (jobId) {
    formData.append('job_id', jobId);
  }
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('talent_token') : null;
  const res = await fetch(`${API_URL}/parse`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload resume');
  return res.json();
}

export async function uploadBatchZip(file: File, jobId?: string) {
  const formData = new FormData();
  formData.append('file', file);
  if (jobId) {
    formData.append('job_id', jobId);
  }
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('talent_token') : null;
  const res = await fetch(`${API_URL}/batch-zip`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload batch ZIP');
  return res.json();
}

export async function createJob(description: string, title?: string) {
  const res = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ description, title: title || description.slice(0, 40) })
  });
  if (!res.ok) throw new Error('Failed to create job');
  return res.json();
}

export async function matchCandidate(candidateId: string, jobDescription: string) {
  const res = await fetch(`${API_URL}/match`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ candidate_id: candidateId, job_description: jobDescription })
  });
  if (!res.ok) throw new Error('Failed to match candidate');
  return res.json();
}

export async function loginUser(data: any) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function signupUser(data: any) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Signup failed');
  return res.json();
}
