// backend/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // this MUST come before using process.env

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials in .env file");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };
