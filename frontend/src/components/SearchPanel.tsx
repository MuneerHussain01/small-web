'use client';

import { useState } from 'react';
import { searchSites, Site } from '@/lib/api';

interface Props {
  onNavigate: (address: string) => void;
}

export default function SearchPanel({ onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Site[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchSites(query.trim());
      setResults(data);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.panel}>
      <div style={styles.header}>Search</div>

      <form onSubmit={handleSearch} style={styles.form}>
        <input
          style={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the small web..."
          autoFocus
        />
        <button type="submit" style={styles.btn} disabled={loading}>
          {loading ? '...' : 'Go'}
        </button>
      </form>

      {searched && results.length === 0 && (
        <div style={styles.hint}>Nothing matched.</div>
      )}

      <div style={styles.list}>
        {results.map((site) => (
          <button
            key={site._id}
            style={styles.row}
            onClick={() => onNavigate(site.address)}
          >
            <span style={styles.title}>{site.title}</span>
            <span style={styles.address}>{site.address}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    width: 260,
    borderLeft: '1px solid #e2e2e2',
    display: 'flex',
    flexDirection: 'column',
    background: '#fafafa',
    flexShrink: 0,
    overflow: 'hidden',
  },
  header: {
    padding: '12px 14px',
    fontWeight: 600,
    fontSize: 13,
    color: '#374151',
    borderBottom: '1px solid #e2e2e2',
    flexShrink: 0,
  },
  form: {
    display: 'flex',
    gap: 6,
    padding: '10px 14px',
    borderBottom: '1px solid #e2e2e2',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: '1px solid #d1d5db',
    borderRadius: 6,
    padding: '6px 10px',
    fontSize: 13,
    outline: 'none',
    minWidth: 0,
  },
  btn: {
    background: '#1d4ed8',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '6px 12px',
    fontSize: 13,
    flexShrink: 0,
  },
  list: {
    overflowY: 'auto',
    flex: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '10px 14px',
    width: '100%',
    textAlign: 'left',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    color: 'inherit',
  },
  title: {
    fontSize: 13,
    fontWeight: 500,
    color: '#111',
  },
  address: {
    fontSize: 11,
    color: '#2563eb',
  },
  hint: {
    padding: '12px 14px',
    fontSize: 13,
    color: '#9ca3af',
  },
};
