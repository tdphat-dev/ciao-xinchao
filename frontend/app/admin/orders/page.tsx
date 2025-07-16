'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: number;
  customer_name: string;
  items: any[];
  total: number;
  phone_number: string;
  address: string;
  payment_method: string;
  payment_status: string;
  order_status: string;
  notes: string;
  created_at: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('https://ciao-api.onrender.com/');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Items</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Payment</th>
              <th className="border px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.customer_name}</td>
                <td className="border px-4 py-2">{order.phone_number}</td>
                <td className="border px-4 py-2">
                  <ul className="list-disc ml-5">
                    {order.items.map((item: any, i: number) => (
                      <li key={i}>
                        {item.name} x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">{order.total.toLocaleString()}₫</td>
                <td className="border px-4 py-2">{order.order_status}</td>
                <td className="border px-4 py-2">{order.payment_status}</td>
                <td className="border px-4 py-2">{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
