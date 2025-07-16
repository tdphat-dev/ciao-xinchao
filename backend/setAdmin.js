import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Replace this with the admin email
const adminEmail = 'trducphat.dev@gmail.com';

async function setAdminRole() {
  try {
    // 1. Get the user by email
    const { data: { users }, error: getError } = await supabase.auth.admin.listUsers();
    if (getError) throw getError;

    const user = users.find(u => u.email === adminEmail);
    if (!user) throw new Error(`User ${adminEmail} not found`);

    // 2. Update the user's metadata to role: 'admin'
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: { role: 'admin' }
    });

    if (updateError) throw updateError;

    console.log(`✅ Set ${adminEmail} as admin successfully.`);
  } catch (err) {
    console.error('❌ Failed to set admin:', err.message);
  }
}

setAdminRole();
