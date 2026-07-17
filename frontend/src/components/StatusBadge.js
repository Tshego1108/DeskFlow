import React from 'react';

function StatusBadge({ status }) {
  const normalized = String(status || '').toLowerCase();
  const className = `status-badge status-badge--${normalized.replace(/\s+/g, '-') || 'unknown'}`;
  return <span className={className}>{status || 'Unknown'}</span>;
}

export default StatusBadge;
