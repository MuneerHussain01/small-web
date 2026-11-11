'use client';

import { useEffect, useRef, useState } from 'react';
import { getSite, Site } from '@/lib/api';

interface Props {
  address: string;
  isVisible: boolean;
  onLinkClick: (address: string) => void;
}

// inject a small script that intercepts link clicks inside the page
// and forwards them to the parent window via postMessage
function buildSrcdoc(html: string): string {
  const intercept = `
<script>
document.addEventListener('click', function(e) {
  var link = e.target && e.target.closest('a[href]');
  if (link) {
    e.preventDefault();
    var href = link.getAttribute('href');
    // only forward if it looks like a small-web address (no http/mailto)
    if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
      window.parent.postMessage({ type: 'navigate', address: href }, '*');
    }
  }
});
<\/script>`;

  if (html.includes('</body>')) {
    return html.replace('</body>', intercept + '</body>');
  }
  return html + intercept;
}

export default function PageView({ address, isVisible, onLinkClick }: Props) {
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setSite(null);

    getSite(address)
      .then((data) => {
        if (data === null) {
          setNotFound(true);
        } else {
          setSite(data);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [address]);

  // listen for postMessage events from the sandboxed iframe
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'navigate' && event.data.address) {
        onLinkClick(event.data.address);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onLinkClick]);

  const visibility: React.CSSProperties = {
    display: isVisible ? 'flex' : 'none',
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  };

  if (loading) {
    return (
      <div style={visibility}>
        <div style={styles.state}>Loading {address}...</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={visibility}>
        <div style={styles.state}>
          <div style={styles.nowhereLabel}>Nothing at {address}</div>
          <div style={styles.nowhereHint}>This address does not exist in the small web.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={visibility}>
      {site && (
        <iframe
          ref={iframeRef}
          // sandbox allows scripts (needed for link interception) but
          // blocks same-origin access, popups, and form submission to servers
          sandbox="allow-scripts"
          srcDoc={buildSrcdoc(site.html)}
          style={styles.iframe}
          title={site.title}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  state: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    gap: 8,
  },
  nowhereLabel: {
    fontSize: 18,
    fontWeight: 600,
    color: '#374151',
  },
  nowhereHint: {
    fontSize: 14,
  },
  iframe: {
    flex: 1,
    border: 'none',
    width: '100%',
    background: '#fff',
  },
};
