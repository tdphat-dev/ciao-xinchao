const express = require('express');
const cors = require('cors');
const { supabase } = require('./supabaseClient.cjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// === GET /api/menu ===
app.get('/api/menu', async (req, res) => {
  const { data, error } = await supabase.from('menu').select('*');
  if (error) {
    console.error('[SUPABASE ERROR]', error);
    return res.status(500).json({ error: 'Failed to fetch menu' });
  }
  res.json(data);
});

// === POST /api/order ===
app.post('/api/order', async (req, res) => {
  console.log('[ORDER RECEIVED]', req.body);
  const {
    customer_name,
    items,
    total,
    phone_number,
    address,
    payment_method,
    notes,
  } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0 || !total) {
    return res.status(400).json({ error: 'Order must include items and total.' });
  }

  const { data, error } = await supabase
    .from('orders')
    .insert([{
      customer_name,
      items,
      total,
      phone_number,
      address,
      payment_status: 'unpaid',
      payment_method: payment_method || 'cash',
      order_status: 'pending',
      notes,
    }])
    .select();

  if (error) {
    console.error('[ORDER INSERT ERROR]', error.message);
    return res.status(500).json({ error: 'Failed to create order' });
  }

  res.status(201).json(data[0]);
});

// === GET /api/admin/orders ===
app.get('/api/admin/orders', async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[ADMIN FETCH ERROR]', error.message);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }

  res.json(data);
});

// === PATCH /api/admin/orders/:id ===
app.patch('/api/admin/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { order_status, payment_status } = req.body;

  if (!order_status && !payment_status) {
    return res.status(400).json({ error: 'Missing update data.' });
  }

  const updateData = {};
  if (order_status) updateData.order_status = order_status;
  if (payment_status) updateData.payment_status = payment_status;

  const { data, error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('[ADMIN UPDATE ERROR]', error.message);
    return res.status(500).json({ error: 'Failed to update order' });
  }

  res.json(data[0]);
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
