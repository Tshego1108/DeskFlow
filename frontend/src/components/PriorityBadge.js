import React from 'react';

function PriorityBadge({ priority }) {
  const normalized = String(priority || '').toLowerCase();
  const className = `priority-badge priority-badge--${normalized || 'low'}`;
  return <span className={className}>{priority || 'Low'}</span>;
}

export default PriorityBadge;
