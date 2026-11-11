'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPeople, Person } from '@/lib/api';

export default function HomePage() {
  const router = useRouter();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Could not reach the backend. Is it running?'))
      .finally(() => setLoading(false));
  }, []);

  function choose(person: Person) {
    router.push(`/browser?personId=${person._id}&personName=${encodeURIComponent(person.name)}`);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Small Web</h1>
        <p style={styles.sub}>Who are you?</p>

        {loading && <p style={styles.hint}>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.list}>
          {people.map((p) => (
            <button key={p._id} style={styles.personBtn} onClick={() => choose(p)}>
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f5f4',
  },
  card: {
    background: '#fff',
    border: '1px solid #e2e2e2',
    borderRadius: 12,
    padding: '40px 48px',
    width: 320,
    textAlign: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    marginBottom: 6,
  },
  sub: {
    color: '#6b7280',
    marginBottom: 28,
    fontSize: 15,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  personBtn: {
    background: '#fff',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    padding: '10px 16px',
    fontSize: 15,
    fontWeight: 500,
    color: '#111',
    transition: 'background 0.1s',
  },
  hint: {
    color: '#9ca3af',
    marginBottom: 16,
    fontSize: 14,
  },
  error: {
    color: '#dc2626',
    marginBottom: 16,
    fontSize: 14,
  },
};
