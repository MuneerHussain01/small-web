'use client';

import { useCallback, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { recordVisit } from '@/lib/api';
import AddressBar from '@/components/AddressBar';
import PageView from '@/components/PageView';
import HistoryPanel from '@/components/HistoryPanel';
import SearchPanel from '@/components/SearchPanel';
import PublishForm from '@/components/PublishForm';

type Panel = 'history' | 'search' | 'publish' | null;

function BrowserApp() {
  const params = useSearchParams();
  const router = useRouter();

  const personId = params.get('personId') || '';
  const personName = params.get('personName') || '';

  const nav = useNavigation();
  const [activePanel, setActivePanel] = useState<Panel>(null);

  // increments each time a visit is recorded - triggers history panel to reload
  const [historyKey, setHistoryKey] = useState(0);

  // redirect to home if no person selected - must be after all hooks
  if (!personId) {
    router.replace('/');
    return null;
  }

  // navigate to a new address and record the visit in the backend
  const handleNavigate = useCallback(
    async (address: string, via: 'address-bar' | 'link' | 'history' | 'search' = 'address-bar') => {
      nav.navigate(address);
      await recordVisit({ personId, personName, address, via });
      setHistoryKey((k) => k + 1);
    },
    [nav, personId, personName],
  );

  // link clicked inside a rendered page
  const handleLinkClick = useCallback(
    (address: string) => handleNavigate(address, 'link'),
    [handleNavigate],
  );

  // jumped to from the history panel
  const handleHistoryJump = useCallback(
    (address: string) => {
      handleNavigate(address, 'history');
      setActivePanel('history');
    },
    [handleNavigate],
  );

  // jumped to from search results
  const handleSearchNavigate = useCallback(
    (address: string) => {
      handleNavigate(address, 'search');
      setActivePanel(null);
    },
    [handleNavigate],
  );

  // published a new site - navigate straight to it
  const handlePublished = useCallback(
    (address: string) => {
      handleNavigate(address, 'address-bar');
      setActivePanel(null);
    },
    [handleNavigate],
  );

  function togglePanel(panel: Panel) {
    setActivePanel((current) => (current === panel ? null : panel));
  }

  return (
    <div style={styles.browser}>
      <AddressBar
        currentAddress={nav.currentAddress}
        canGoBack={nav.canGoBack}
        canGoForward={nav.canGoForward}
        onNavigate={(addr) => handleNavigate(addr, 'address-bar')}
        onBack={nav.goBack}
        onForward={nav.goForward}
        onToggleHistory={() => togglePanel('history')}
        onToggleSearch={() => togglePanel('search')}
        onTogglePublish={() => togglePanel('publish')}
        activePanel={activePanel}
      />

      <div style={styles.body}>
        {/* page area - all pages in the navigation stack stay mounted so
            going back restores the page exactly as it was left (scroll position, etc.) */}
        <div style={styles.pageArea}>
          {nav.stack.length === 0 && (
            <div style={styles.empty}>
              <div style={styles.emptyText}>Type an address above to start browsing.</div>
              <div style={styles.emptyHint}>
                Try: tidepool.zz, nightsky.zz, quietroads.zz, signal.zz
              </div>
            </div>
          )}

          {nav.stack.map((address, i) => (
            <PageView
              key={`${i}-${address}`}
              address={address}
              isVisible={i === nav.cursor}
              onLinkClick={handleLinkClick}
            />
          ))}
        </div>

        {/* side panels */}
        {activePanel === 'history' && (
          <HistoryPanel
            personId={personId}
            personName={personName}
            onJump={handleHistoryJump}
            refreshKey={historyKey}
          />
        )}
        {activePanel === 'search' && (
          <SearchPanel onNavigate={handleSearchNavigate} />
        )}
        {activePanel === 'publish' && (
          <PublishForm defaultAuthor={personName} onPublished={handlePublished} />
        )}
      </div>

      <div style={styles.statusBar}>
        Browsing as <strong>{personName}</strong>
        {nav.currentAddress && (
          <span style={styles.statusAddress}> &mdash; {nav.currentAddress}</span>
        )}
      </div>
    </div>
  );
}

export default function BrowserPage() {
  // Suspense is required because useSearchParams() needs it in Next.js App Router
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
      <BrowserApp />
    </Suspense>
  );
}

const styles: Record<string, React.CSSProperties> = {
  browser: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    background: '#f5f5f4',
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  pageArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: '#fff',
  },
  empty: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    color: '#6b7280',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 500,
    color: '#374151',
  },
  emptyHint: {
    fontSize: 13,
    fontFamily: 'ui-monospace, monospace',
  },
  statusBar: {
    padding: '6px 14px',
    fontSize: 12,
    color: '#6b7280',
    background: '#fff',
    borderTop: '1px solid #e2e2e2',
    flexShrink: 0,
  },
  statusAddress: {
    color: '#9ca3af',
  },
};
