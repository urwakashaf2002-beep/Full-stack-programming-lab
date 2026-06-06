'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { clearAuth } from '../lib/auth';
import styles from './Sidebar.module.css';

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: '◈' },
  { href: '/dashboard/customers', label: 'Customers', icon: '◉' },
  { href: '/dashboard/invoice', label: 'Invoices', icon: '◫' },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('crm_user');
    if (u) setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>⬡</span>
        <span className={styles.logoText}>NexCRM</span>
      </div>
      <nav className={styles.nav}>
        {NAV.map(n => (
          <Link key={n.href} href={n.href}
            className={`${styles.navItem} ${pathname === n.href ? styles.active : ''}`}>
            <span className={styles.navIcon}>{n.icon}</span>
            <span>{n.label}</span>
          </Link>
        ))}
      </nav>
      <div className={styles.bottom}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <div className={styles.userName}>{user?.name || ''}</div>
            <div className={styles.userEmail}>{user?.email || ''}</div>
          </div>
        </div>
        <button onClick={logout} className={styles.logout}>⏻ Logout</button>
      </div>
    </aside>
  );
}