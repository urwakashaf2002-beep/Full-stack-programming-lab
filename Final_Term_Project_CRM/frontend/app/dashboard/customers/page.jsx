'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import styles from './customers.module.css';

const EMPTY = { name: '', email: '', phone: '', company: '', address: '', status: 'Lead', notes: '' };

export default function CustomersPage() {
  const searchParams = useSearchParams();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (searchParams.get('action') === 'add') setShowForm(true);
  }, [searchParams]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (filter !== 'All') params.status = filter;
      const { data } = await api.get('/customers', { params });
      setCustomers(data);
    } catch { toast.error('Failed to load customers'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCustomers(); }, [search, filter]);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (c) => { setEditing(c._id); setForm({ name: c.name, email: c.email, phone: c.phone, company: c.company || '', address: c.address || '', status: c.status, notes: c.notes || '' }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(EMPTY); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/customers/${editing}`, form);
        toast.success('Customer updated!');
      } else {
        await api.post('/customers', form);
        toast.success('Customer added!');
      }
      closeForm();
      fetchCustomers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      toast.success('Customer deleted');
      setDeleting(null);
      fetchCustomers();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Customers</h1>
          <p className={styles.pageSubtitle}>{customers.length} records found</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}>+ Add Customer</button>
      </div>

      <div className={styles.controls}>
        <input className={styles.searchInput} placeholder="Search by name..." value={search}
          onChange={e => setSearch(e.target.value)} />
        <div className={styles.filters}>
          {['All', 'Lead', 'Active', 'Inactive'].map(s => (
            <button key={s} className={`${styles.filterBtn} ${filter === s ? styles.filterActive : ''}`}
              onClick={() => setFilter(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableHead}>
          <span>Customer</span><span>Phone</span><span>Company</span><span>Status</span><span>Actions</span>
        </div>
        {loading && <div className={styles.empty}>Loading...</div>}
        {!loading && customers.length === 0 && <div className={styles.empty}>No customers found</div>}
        {customers.map(c => (
          <div key={c._id} className={styles.tableRow}>
            <div>
              <div className={styles.name}>{c.name}</div>
              <div className={styles.email}>{c.email}</div>
            </div>
            <span className={styles.muted}>{c.phone}</span>
            <span className={styles.muted}>{c.company || '—'}</span>
            <span className={`${styles.badge} ${styles[c.status?.toLowerCase()]}`}>{c.status}</span>
            <div className={styles.actions}>
              <button className={styles.editBtn} onClick={() => openEdit(c)}>Edit</button>
              <button className={styles.deleteBtn} onClick={() => setDeleting(c._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className={styles.overlay} onClick={closeForm}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editing ? 'Edit Customer' : 'Add Customer'}</h2>
              <button onClick={closeForm} className={styles.closeBtn}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.field}><label>Full Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
                <div className={styles.field}><label>Email *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
                <div className={styles.field}><label>Phone *</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required /></div>
                <div className={styles.field}><label>Company</label><input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
                <div className={styles.field}><label>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                    <option>Lead</option><option>Active</option><option>Inactive</option>
                  </select>
                </div>
                <div className={styles.field}><label>Address</label><input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
              </div>
              <div className={styles.field}><label>Notes</label><textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
              <div className={styles.formActions}>
                <button type="button" onClick={closeForm} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>{editing ? 'Update Customer' : 'Add Customer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleting && (
        <div className={styles.overlay} onClick={() => setDeleting(null)}>
          <div className={styles.confirmModal} onClick={e => e.stopPropagation()}>
            <h3>Delete Customer?</h3>
            <p>This action cannot be undone.</p>
            <div className={styles.confirmActions}>
              <button onClick={() => setDeleting(null)} className={styles.cancelBtn}>Cancel</button>
              <button onClick={() => handleDelete(deleting)} className={styles.deleteConfirmBtn}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}