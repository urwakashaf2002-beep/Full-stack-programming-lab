const express = require('express');
const Invoice = require('../models/Invoice');
const protect = require('../middleware/auth');
const router = express.Router();

router.use(protect);

// Generate invoice number
const generateInvoiceNumber = () => `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// Get all
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('customer', 'name email company').sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get by customer
router.get('/customer/:customerId', async (req, res) => {
  try {
    const invoices = await Invoice.find({ customer: req.params.customerId }).populate('customer');
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create
router.post('/', async (req, res) => {
  try {
    const invoice = await Invoice.create({
      ...req.body,
      invoiceNumber: generateInvoiceNumber(),
      createdBy: req.user.id
    });
    const populated = await invoice.populate('customer', 'name email company address');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;