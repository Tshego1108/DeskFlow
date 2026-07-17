import React from 'react';

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon" style={{ backgroundColor: `${accent}14`, color: accent }}>
        <Icon size={20} />
      </div>
      <div>
        <p className="stat-card__label">{label}</p>
        <h3 className="stat-card__value">{value}</h3>
      </div>
    </div>
  );
}

export default StatCard;
