'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Failed to fetch orders:', error);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">🛒 Admin Order Dashboard</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="p-4 rounded bg-gray-800 shadow">
              <p><strong>👤 Name:</strong> {order.customer_name}</p>
              <p><strong>📞 Phone:</strong> {order.phone_number}</p>
              <p><strong>🏠 Address:</strong> {order.address}</p>
              <p><strong>💰 Total:</strong> {order.total.toLocaleString()} VND</p>
              <p><strong>📝 Notes:</strong> {order.notes || 'None'}</p>
              <p><strong>💳 Payment:</strong> {order.payment_method} — {order.payment_status}</p>
              <p><strong>📦 Status:</strong> {order.order_status}</p>
              <p><strong>🕒 Time:</strong> {new Date(order.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
