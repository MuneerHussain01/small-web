'use client';

import { useState, useEffect } from 'react';

interface Props {
  currentAddress: string | null;
  canGoBack: boolean;
  canGoForward: boolean;
  onNavigate: (address: string) => void;
  onBack: () => void;
  onForward: () => void;
  onToggleHistory: () => void;
  onToggleSearch: () => void;
  onTogglePublish: () => void;
  activePanel: string | null;
}

export default function AddressBar({
  currentAddress,
  canGoBack,
  canGoForward,
  onNavigate,
  onBack,
  onForward,
  onToggleHistory,
  onToggleSearch,
  onTogglePublish,
  activePanel,
}: Props) {
  const [input, setInput] = useState('');

  // keep the input in sync when navigation happens externally (e.g. link click)
  useEffect(() => {
    setInput(currentAddress || '');
  }, [currentAddress]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const address = input.trim();
      if (address) onNavigate(address);
    }
  }

  return (
    <div style={styles.bar}>
      {/* back and forward */}
      <button
        style={{ ...styles.navBtn, opacity: canGoBack ? 1 : 0.35 }}
        onClick={onBack}
        disabled={!canGoBack}
        title="Back"
      >
        &larr;
      </button>
      <button
        style={{ ...styles.navBtn, opacity: canGoForward ? 1 : 0.35 }}
        onClick={onForward}
        disabled={!canGoForward}
        title="Forward"
      >
        &rarr;
      </button>

      {/* address input */}
      <input
        style={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type an address and press Enter"
        spellCheck={false}
        autoComplete="off"
      />

      {/* panel toggles */}
      <button
        style={{ ...styles.panelBtn, background: activePanel === 'history' ? '#e0e7ff' : '#f3f4f6' }}
        onClick={onToggleHistory}
        title="History"
      >
        History
      </button>
      <button
        style={{ ...styles.panelBtn, background: activePanel === 'search' ? '#e0e7ff' : '#f3f4f6' }}
        onClick={onToggleSearch}
        title="Search"
      >
        Search
      </button>
      <button
        style={{ ...styles.panelBtn, background: activePanel === 'publish' ? '#e0e7ff' : '#f3f4f6' }}
        onClick={onTogglePublish}
        title="Publish a site"
      >
        Publish
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  bar: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 12px',
    background: '#fff',
    borderBottom: '1px solid #e2e2e2',
    flexShrink: 0,
  },
  navBtn: {
    background: 'none',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#374151',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: '1px solid #d1d5db',
    borderRadius: 6,
    padding: '6px 12px',
    fontSize: 14,
    outline: 'none',
    background: '#f9fafb',
    color: '#111',
    minWidth: 0,
  },
  panelBtn: {
    border: '1px solid #d1d5db',
    borderRadius: 6,
    padding: '6px 12px',
    fontSize: 13,
    color: '#374151',
    flexShrink: 0,
  },
};
