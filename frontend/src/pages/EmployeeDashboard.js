import React, {useContext, useEffect, useState} from 'react';
import {CheckCircle2, Clock3, ListTodo, PlusCircle, AlertTriangle} from 'lucide-react';
import {AuthContext} from '../context/AuthContext';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import Loader from '../components/Loader';

function EmployeeDashboard(){
  const {api, user, logout} = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async ()=>{
    setLoading(true);
    const res = await api.get('/tickets/me');
    setTickets(res.data);
    setLoading(false);
  };

  useEffect(()=>{ fetchTickets(); },[]);

  const stats = [
    {label: 'Open', value: tickets.filter(t => t.status === 'Open').length, icon: AlertTriangle, accent: '#2563EB'},
    {label: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length, icon: Clock3, accent: '#F59E0B'},
    {label: 'Resolved', value: tickets.filter(t => t.status === 'Resolved').length, icon: CheckCircle2, accent: '#22C55E'},
    {label: 'Total', value: tickets.length, icon: ListTodo, accent: '#06B6D4'}
  ];

  return (
    <div className="app-shell">
      <Navbar title="Employee Dashboard" user={user} onLogout={logout} />
      <main className="dashboard-shell">
        <section className="hero-panel">
          <div>
            <p className="eyebrow">Good day</p>
            <h2>Welcome back, {user?.name || 'there'}.</h2>
            <p className="hero-copy">Keep your IT requests moving with a clear, modern view of your active tickets.</p>
          </div>
          <div className="hero-panel__pill">{tickets.length} active requests</div>
        </section>

        <section className="stats-grid">
          {stats.map((item) => <StatCard key={item.label} {...item} />)}
        </section>

        <section className="dashboard-grid">
          <div className="panel panel--wide">
            <TicketForm onCreated={fetchTickets} />
          </div>
          <div className="panel">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Overview</p>
                <h3>My Tickets</h3>
              </div>
            </div>
            {loading ? <Loader /> : <TicketList tickets={tickets} />}
          </div>
        </section>
      </main>
    </div>
  );
}

export default EmployeeDashboard;
