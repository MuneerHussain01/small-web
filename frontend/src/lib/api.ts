const BASE = '/api';

export interface Person {
  _id: string;
  name: string;
}

export interface Site {
  _id: string;
  address: string;
  title: string;
  html: string;
  author: string;
}

export interface Visit {
  _id: string;
  personId: string;
  personName: string;
  address: string;
  timestamp: string;
  via: string;
}

export async function getPeople(): Promise<Person[]> {
  const res = await fetch(`${BASE}/people`);
  if (!res.ok) throw new Error('Failed to fetch people');
  return res.json();
}

// returns null instead of throwing when the address is not found (404)
export async function getSite(address: string): Promise<Site | null> {
  const res = await fetch(`${BASE}/sites/${encodeURIComponent(address)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch site');
  return res.json();
}

export async function publishSite(data: {
  address: string;
  title: string;
  html: string;
  author: string;
}): Promise<Site> {
  const res = await fetch(`${BASE}/sites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Failed to publish');
  }
  return res.json();
}

export async function searchSites(q: string): Promise<Site[]> {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function recordVisit(data: {
  personId: string;
  personName: string;
  address: string;
  via: string;
}): Promise<void> {
  await fetch(`${BASE}/visits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function getHistory(personId: string): Promise<Visit[]> {
  const res = await fetch(`${BASE}/history/${personId}`);
  if (!res.ok) throw new Error('Failed to fetch history');
  return res.json();
}
