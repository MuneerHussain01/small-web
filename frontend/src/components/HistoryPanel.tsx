'use client';

import { useEffect, useState } from 'react';
import { getHistory, Visit } from '@/lib/api';

interface Props {
  personId: string;
  personName: string;
  onJump: (address: string) => void;
  // refreshKey increments each time a new visit is recorded so the list reloads
  refreshKey: number;
}

export default function HistoryPanel({ personId, personName, onJump, refreshKey }: Props) {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getHistory(personId)
      .then(setVisits)
      .finally(() => setLoading(false));
  }, [personId, refreshKey]);

  function formatTime(ts: string) {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div style={styles.panel}>
      <div style={styles.header}>{personName}'s history</div>

      {loading && <div style={styles.hint}>Loading...</div>}

      {!loading && visits.length === 0 && (
        <div style={styles.hint}>No visits yet. Start browsing.</div>
      )}

      <div style={styles.list}>
        {visits.map((v) => (
          <button key={v._id} style={styles.row} onClick={() => onJump(v.address)}>
            <span style={styles.address}>{v.address}</span>
            <span style={styles.meta}>{formatTime(v.timestamp)} &middot; {v.via}</span>
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
  address: {
    fontSize: 13,
    fontWeight: 500,
    color: '#2563eb',
  },
  meta: {
    fontSize: 11,
    color: '#9ca3af',
  },
  hint: {
    padding: '12px 14px',
    fontSize: 13,
    color: '#9ca3af',
  },
};
