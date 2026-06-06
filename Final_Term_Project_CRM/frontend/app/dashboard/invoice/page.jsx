'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import styles from './invoice.module.css';

const EMPTY_SERVICE = { description: '', quantity: 1, unitPrice: 0, total: 0 };

export default function InvoicePage() {
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [services, setServices] = useState([{ ...EMPTY_SERVICE }]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    api.get('/customers').then(r => setCustomers(r.data));
    api.get('/invoices').then(r => setInvoices(r.data));
  }, []);

  const updateService = (i, field, value) => {
    const updated = [...services];
    updated[i][field] = field === 'description' ? value : parseFloat(value) || 0;
    if (field === 'quantity' || field === 'unitPrice') {
      updated[i].total = updated[i].quantity * updated[i].unitPrice;
    }
    setServices(updated);
  };

  const totalAmount = services.reduce((s, r) => s + r.total, 0);

  const generate = async () => {
    if (!selectedCustomer) return toast.error('Select a customer');
    if (services.some(s => !s.description)) return toast.error('Fill all service descriptions');
    try {
      const { data } = await api.post('/invoices', {
        customer: selectedCustomer,
        services,
        totalAmount,
        status: 'Pending'
      });
      toast.success('Invoice generated!');
      setInvoices(p => [data, ...p]);
      setPreview(data);
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate invoice');
    }
  };

  const downloadPDF = async (inv) => {
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    const doc = new jsPDF();
    doc.setFillColor(8, 13, 20);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(212, 168, 67);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('NexCRM', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(136, 153, 170);
    doc.text('Customer Intelligence Platform', 14, 30);
    doc.setTextColor(232, 220, 200);
    doc.setFontSize(18);
    doc.text('INVOICE', 150, 22, { align: 'right' });
    doc.setFontSize(10);
    doc.setTextColor(136, 153, 170);
    doc.text(inv.invoiceNumber || 'N/A', 150, 30, { align: 'right' });
    doc.setTextColor(232, 220, 200);
    doc.setFontSize(11);
    doc.text(`Customer: ${inv.customer?.name || 'N/A'}`, 14, 50);
    doc.text(`Email: ${inv.customer?.email || ''}`, 14, 58);
    doc.text(`Date: ${new Date(inv.date || inv.createdAt).toLocaleDateString()}`, 14, 66);
    doc.text(`Status: ${inv.status}`, 14, 74);
    autoTable(doc, {
      startY: 88,
      head: [['Service', 'Qty', 'Unit Price', 'Total']],
      body: inv.services.map(s => [s.description, s.quantity, `$${s.unitPrice.toFixed(2)}`, `$${s.total.toFixed(2)}`]),
      foot: [['', '', 'Total Amount', `$${inv.totalAmount.toFixed(2)}`]],
      theme: 'grid',
      headStyles: { fillColor: [26, 36, 56], textColor: [212, 168, 67], fontStyle: 'bold' },
      bodyStyles: { fillColor: [20, 29, 46], textColor: [232, 220, 200] },
      footStyles: { fillColor: [26, 36, 56], textColor: [212, 168, 67], fontStyle: 'bold' },
    });
    doc.save(`${inv.invoiceNumber}.pdf`);
    toast.success('PDF downloaded!');
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Invoices</h1>
          <p className={styles.pageSubtitle}>{invoices.length} invoices generated</p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>+ Generate Invoice</button>
      </div>

      {/* Invoice list */}
      <div className={styles.tableWrap}>
        <div className={styles.tableHead}>
          <span>Invoice #</span><span>Customer</span><span>Amount</span><span>Status</span><span>Date</span><span>Actions</span>
        </div>
        {invoices.length === 0 && <div className={styles.empty}>No invoices yet</div>}
        {invoices.map(inv => (
          <div key={inv._id} className={styles.tableRow}>
            <span className={styles.invNum}>{inv.invoiceNumber}</span>
            <span>{inv.customer?.name || '—'}</span>
            <span className={styles.amount}>${inv.totalAmount?.toFixed(2)}</span>
            <span className={`${styles.badge} ${styles[inv.status?.toLowerCase()]}`}>{inv.status}</span>
            <span className={styles.muted}>{new Date(inv.createdAt).toLocaleDateString()}</span>
            <div className={styles.actions}>
              <button className={styles.viewBtn} onClick={() => setPreview(inv)}>View</button>
              <button className={styles.dlBtn} onClick={() => downloadPDF(inv)}>PDF</button>
            </div>
          </div>
        ))}
      </div>

      {/* Generate Form */}
      {showForm && (
        <div className={styles.overlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Generate Invoice</h2>
              <button onClick={() => setShowForm(false)} className={styles.closeBtn}>✕</button>
            </div>
            <div className={styles.form}>
              <div className={styles.field}>
                <label>Select Customer</label>
                <select value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)}>
                  <option value="">-- Choose customer --</option>
                  {customers.map(c => <option key={c._id} value={c._id}>{c.name} — {c.email}</option>)}
                </select>
              </div>
              <div>
                <div className={styles.servicesHeader}>
                  <label>Services</label>
                  <button className={styles.addServiceBtn} onClick={() => setServices(s => [...s, { ...EMPTY_SERVICE }])}>+ Add Row</button>
                </div>
                {services.map((s, i) => (
                  <div key={i} className={styles.serviceRow}>
                    <input placeholder="Description" value={s.description} onChange={e => updateService(i, 'description', e.target.value)} style={{ flex: 2 }} />
                    <input type="number" placeholder="Qty" value={s.quantity} onChange={e => updateService(i, 'quantity', e.target.value)} style={{ flex: 0.5 }} />
                    <input type="number" placeholder="Unit Price" value={s.unitPrice} onChange={e => updateService(i, 'unitPrice', e.target.value)} style={{ flex: 1 }} />
                    <div className={styles.rowTotal}>${s.total.toFixed(2)}</div>
                    {services.length > 1 && <button onClick={() => setServices(s => s.filter((_, j) => j !== i))} className={styles.removeRow}>✕</button>}
                  </div>
                ))}
                <div className={styles.totalRow}>Total: <span>${totalAmount.toFixed(2)}</span></div>
              </div>
              <div className={styles.formActions}>
                <button onClick={() => setShowForm(false)} className={styles.cancelBtn}>Cancel</button>
                <button onClick={generate} className={styles.submitBtn}>Generate →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className={styles.overlay} onClick={() => setPreview(null)}>
          <div className={styles.previewModal} onClick={e => e.stopPropagation()}>
            <div className={styles.previewHeader}>
              <div>
                <div className={styles.previewLogoText}>NexCRM</div>
                <div className={styles.previewInvTitle}>INVOICE</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className={styles.invNum}>{preview.invoiceNumber}</div>
                <div className={styles.muted}>{new Date(preview.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            <div className={styles.previewMeta}>
              <div><strong>Customer:</strong> {preview.customer?.name}</div>
              <div><strong>Email:</strong> {preview.customer?.email}</div>
              <div><strong>Status:</strong> <span className={`${styles.badge} ${styles[preview.status?.toLowerCase()]}`}>{preview.status}</span></div>
            </div>
            <div className={styles.previewTable}>
              <div className={styles.previewHead}><span>Service</span><span>Qty</span><span>Unit</span><span>Total</span></div>
              {preview.services?.map((s, i) => (
                <div key={i} className={styles.previewRow}>
                  <span>{s.description}</span><span>{s.quantity}</span><span>${s.unitPrice.toFixed(2)}</span><span>${s.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className={styles.previewTotal}>Total Amount: <span>${preview.totalAmount?.toFixed(2)}</span></div>
            <div className={styles.previewActions}>
              <button onClick={() => setPreview(null)} className={styles.cancelBtn}>Close</button>
              <button onClick={() => downloadPDF(preview)} className={styles.submitBtn}>Download PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}