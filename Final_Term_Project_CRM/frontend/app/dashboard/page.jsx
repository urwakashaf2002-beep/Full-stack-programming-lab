'use client';
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, active: 0, leads: 0, inactive: 0 });
  const [customers, setCustomers] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const u = localStorage.getItem('crm_user');
    if (u) setUserName(JSON.parse(u).name);
    api.get('/customers').then(({ data }) => {
      setCustomers(data.slice(0, 5));
      setStats({
        total: data.length,
        active: data.filter(c => c.status === 'Active').length,
        leads: data.filter(c => c.status === 'Lead').length,
        inactive: data.filter(c => c.status === 'Inactive').length,
      });
    });
  }, []);

  const CARDS = [
    { label: 'Total Customers', value: stats.total, sub: 'All records', color: '#60a5fa', bg: 'rgba(96,165,250,0.15)', icon: '👥' },
    { label: 'Active', value: stats.active, sub: `${stats.total ? Math.round((stats.active/stats.total)*100) : 0}% of total`, color: '#34d399', bg: 'rgba(52,211,153,0.15)', icon: '✓' },
    { label: 'Leads', value: stats.leads, sub: `${stats.total ? Math.round((stats.leads/stats.total)*100) : 0}% of total`, color: '#f0b429', bg: 'rgba(240,180,41,0.15)', icon: '★' },
    { label: 'Inactive', value: stats.inactive, sub: `${stats.total ? Math.round((stats.inactive/stats.total)*100) : 0}% of total`, color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', icon: '○' },
  ];

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
  const avatarColors = [
    { bg: 'rgba(96,165,250,0.2)', color: '#60a5fa' },
    { bg: 'rgba(52,211,153,0.2)', color: '#34d399' },
    { bg: 'rgba(240,180,41,0.2)', color: '#f0b429' },
    { bg: 'rgba(167,139,250,0.2)', color: '#a78bfa' },
    { bg: 'rgba(248,113,113,0.2)', color: '#f87171' },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Overview</h1>
          <p className={styles.pageSubtitle}>Welcome back, {userName}</p>
        </div>
        <div className={styles.dateBadge}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className={styles.statsGrid}>
        {CARDS.map(c => (
          <div key={c.label} className={styles.statCard}>
            <div className={styles.statTop}>
              <span className={styles.statLabel}>{c.label}</span>
              <div className={styles.statIconBox} style={{ background: c.bg }}>
                <span style={{ color: c.color, fontSize: '16px' }}>{c.icon}</span>
              </div>
            </div>
            <div className={styles.statValue}>{c.value}</div>
            <div className={styles.statSub}>{c.sub}</div>
            <div className={styles.statBar}>
              <div className={styles.statBarFill} style={{ width: `${stats.total ? (c.value / stats.total) * 100 : 0}%`, background: c.color }} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Customers</h2>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Customer</span><span>Company</span><span>Status</span><span>Email</span>
          </div>
          {customers.map((c, i) => (
            <div key={c._id} className={styles.tableRow}>
              <div className={styles.customerCell}>
                <div className={styles.customerAvatar} style={{ background: avatarColors[i % 5].bg, color: avatarColors[i % 5].color }}>
                  {getInitials(c.name)}
                </div>
                <span className={styles.customerName}>{c.name}</span>
              </div>
              <span className={styles.muted}>{c.company || '—'}</span>
              <span className={`${styles.badge} ${styles[c.status?.toLowerCase()]}`}>{c.status}</span>
              <span className={styles.muted}>{c.email}</span>
            </div>
          ))}
          {customers.length === 0 && <div className={styles.empty}>No customers yet. Add some!</div>}
        </div>
      </div>
    </div>
  );
}