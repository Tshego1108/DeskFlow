import React from 'react';
import {CalendarDays, Ticket} from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

function TicketList({tickets=[]}){
  if (!tickets.length) return <div className="empty-state"><Ticket size={18} /><p>No tickets yet. Submit your first request to get started.</p></div>;

  return (
    <div className="ticket-grid">
      {tickets.map(t => (
        <article key={t._id} className="ticket-card">
          <div className="ticket-card__top">
            <div>
              <p className="eyebrow">Request</p>
              <h4>{t.title}</h4>
            </div>
            <div className="ticket-card__icons">
              <StatusBadge status={t.status} />
              <PriorityBadge priority={t.priority} />
            </div>
          </div>
          <p className="ticket-card__description">{t.description}</p>
          <div className="ticket-card__meta">
            <div className="meta-item">
              <CalendarDays size={14} />
              <span>{new Date(t.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default TicketList;
