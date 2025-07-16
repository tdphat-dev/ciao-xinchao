'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProductAdminPage() {
  const [menu, setMenu] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase.from('menu').select('*');
      if (error) {
        console.error('Failed to fetch menu:', error);
      } else {
        setMenu(data);
      }
      setLoading(false);
    };
    fetchMenu();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🥤 Product Management</h1>
      {loading ? (
        <p>Loading menu...</p>
      ) : (
        <ul className="space-y-4">
          {menu.map((item) => (
            <li key={item.id} className="p-4 rounded-lg border shadow">
              <div className="font-semibold">{item.name}</div>
              <div>{item.description}</div>
              <div className="text-green-700 font-bold">{item.price} VND</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
