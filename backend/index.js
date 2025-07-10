const express = require('express');
const cors = require('cors');
const { supabase } = require('./supabaseClient'); // your Supabase connector
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//Route to get menu items from Supabase
app.get('/api/menu', async (req, res) => {
  const { data, error } = await supabase.from('menu').select('*');

  if (error) {
    console.error('[SUPABASE ERROR]', error);
    return res.status(500).json({ error: 'Failed to fetch menu' });
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`✅ Backend is running at http://localhost:${PORT}`);
});
