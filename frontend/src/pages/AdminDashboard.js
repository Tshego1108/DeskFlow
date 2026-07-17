import React, {useContext, useEffect, useState} from 'react';
import {AlertTriangle, CheckCircle2, Clock3, Layers3, ShieldCheck} from 'lucide-react';
import {AuthContext} from '../context/AuthContext';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import Loader from '../components/Loader';

function AdminDashboard(){
  const {api, user, logout} = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async ()=>{
    setLoading(true);
    const res = await api.get('/tickets');
    setTickets(res.data);
    setLoading(false);
  };

  useEffect(()=>{ fetchTickets(); },[]);

  const updateStatus = async (id, status) =>{
    await api.patch(`/tickets/${id}/status`, {status});
    fetchTickets();
  };

  const stats = [
    {label: 'Total Tickets', value: tickets.length, icon: Layers3, accent: '#2563EB'},
    {label: 'Open', value: tickets.filter(t => t.status === 'Open').length, icon: AlertTriangle, accent: '#06B6D4'},
    {label: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length, icon: Clock3, accent: '#F59E0B'},
    {label: 'Resolved', value: tickets.filter(t => t.status === 'Resolved').length, icon: CheckCircle2, accent: '#22C55E'}
  ];

  return (
    <div className="app-shell">
      <Navbar title="Admin Dashboard" user={user} onLogout={logout} />
      <main className="dashboard-shell">
        <section className="hero-panel hero-panel--compact">
          <div>
            <p className="eyebrow">Operations center</p>
            <h2>Keep service delivery on track.</h2>
            <p className="hero-copy">Review requests, triage priorities and keep teams aligned from one place.</p>
          </div>
          <div className="hero-panel__pill hero-panel__pill--success"><ShieldCheck size={16} /> Live queue</div>
        </section>

        <section className="stats-grid">
          {stats.map((item) => <StatCard key={item.label} {...item} />)}
        </section>

        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Management</p>
              <h3>Ticket Queue</h3>
            </div>
          </div>
          {loading ? <Loader /> : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ticket</th>
                    <th>Requester</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(t => (
                    <tr key={t._id}>
                      <td>
                        <div className="table-ticket">
                          <strong>{t.title}</strong>
                          <span>{t.description}</span>
                        </div>
                      </td>
                      <td>{t.requester?.name || 'Unknown'}</td>
                      <td><PriorityBadge priority={t.priority} /></td>
                      <td><StatusBadge status={t.status} /></td>
                      <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="action-group">
                          <button className="button button--secondary" onClick={()=>updateStatus(t._id,'Open')}>Open</button>
                          <button className="button button--secondary" onClick={()=>updateStatus(t._id,'In Progress')}>In Progress</button>
                          <button className="button button--primary" onClick={()=>updateStatus(t._id,'Resolved')}>Resolve</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
