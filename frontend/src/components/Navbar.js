import React from 'react';
import { LayoutGrid, LogOut } from 'lucide-react';

function Navbar({ title, user, onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <div>
          <p className="brand-name">DeskFlow</p>
          <p className="brand-subtitle">Internal IT Service Portal</p>
        </div>
      </div>

      <div className="topbar__title">
        <LayoutGrid size={16} />
        <span>{title}</span>
      </div>

      <div className="topbar__user">
        <div className="avatar">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
        <div>
          <p className="user-name">{user?.name || 'User'}</p>
          <p className="user-role">{user?.role || 'Member'}</p>
        </div>
        <button className="button button--ghost" onClick={onLogout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
