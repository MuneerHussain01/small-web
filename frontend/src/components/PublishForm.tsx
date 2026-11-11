'use client';

import { useState } from 'react';
import { publishSite } from '@/lib/api';

interface Props {
  defaultAuthor: string;
  onPublished: (address: string) => void;
}

export default function PublishForm({ defaultAuthor, onPublished }: Props) {
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [html, setHtml] = useState('');
  const [author, setAuthor] = useState(defaultAuthor);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const site = await publishSite({ address: address.trim(), title: title.trim(), html, author: author.trim() });
      setDone(true);
      setAddress('');
      setTitle('');
      setHtml('');
      onPublished(site.address);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div style={styles.panel}>
        <div style={styles.header}>Publish</div>
        <div style={{ padding: 14 }}>
          <p style={styles.success}>Published. Opening the page now.</p>
          <button style={styles.again} onClick={() => setDone(false)}>Publish another</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.panel}>
      <div style={styles.header}>Publish a site</div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Address</label>
        <input
          style={styles.input}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="yoursite.zz"
          required
        />

        <label style={styles.label}>Title</label>
        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Page title"
          required
        />

        <label style={styles.label}>Author</label>
        <input
          style={styles.input}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          required
        />

        <label style={styles.label}>HTML</label>
        <textarea
          style={styles.textarea}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="<h1>Hello</h1><p>Write your page here.</p>"
          required
          rows={8}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.btn} disabled={submitting}>
          {submitting ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    width: 280,
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
    flexDirection: 'column',
    gap: 6,
    padding: 14,
    overflowY: 'auto',
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: '#374151',
    marginTop: 4,
  },
  input: {
    border: '1px solid #d1d5db',
    borderRadius: 6,
    padding: '7px 10px',
    fontSize: 13,
    outline: 'none',
    background: '#fff',
  },
  textarea: {
    border: '1px solid #d1d5db',
    borderRadius: 6,
    padding: '7px 10px',
    fontSize: 13,
    outline: 'none',
    background: '#fff',
    resize: 'vertical',
    fontFamily: 'ui-monospace, monospace',
    lineHeight: 1.5,
  },
  btn: {
    background: '#1d4ed8',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '8px 14px',
    fontSize: 13,
    fontWeight: 600,
    marginTop: 4,
  },
  error: {
    fontSize: 12,
    color: '#dc2626',
  },
  success: {
    fontSize: 14,
    color: '#16a34a',
    marginBottom: 12,
  },
  again: {
    background: 'none',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    padding: '7px 12px',
    fontSize: 13,
    color: '#374151',
  },
};
