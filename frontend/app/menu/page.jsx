'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    customer_name: '',
    phone_number: '',
    address: '',
    notes: '',
    payment_method: 'cash',
  });

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/menu`)
      .then(res => setMenu(res.data))
      .catch(err => console.error('Failed to load menu', err));
  }, []);

  const addToCart = (item) => {
    const exists = cart.find(c => c.id === item.id);
    if (exists) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleOrder = async () => {
    if (cart.length === 0) return alert('🛒 Vui lòng chọn ít nhất 1 món!');
    if (!form.customer_name || !form.phone_number || !form.address)
      return alert('❗ Vui lòng điền đầy đủ thông tin đặt hàng');

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const orderData = {
      ...form,
      items: cart,
      total,
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/api/order`, orderData);
      alert('🎉 Đặt hàng thành công! Cảm ơn bạn.');
      // Reset form
      setCart([]);
      setForm({
        customer_name: '',
        phone_number: '',
        address: '',
        notes: '',
        payment_method: 'cash',
      });
    } catch (err) {
      alert('❌ Có lỗi khi đặt hàng. Vui lòng thử lại.');
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🥤 Ciao Beverage Menu</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {menu.map(item => (
          <div key={item.id} className="border rounded p-3 shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-700">{item.price.toLocaleString()} VND</p>
            <button onClick={() => addToCart(item)} className="mt-2 px-3 py-1 bg-green-600 text-white rounded">
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-2">🛒 Giỏ hàng</h2>
      {cart.length === 0 ? (
        <p>Chưa có món nào trong giỏ</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {cart.map(item => (
            <li key={item.id} className="flex justify-between items-center">
              <span>{item.name} x {item.qty}</span>
              <span>{(item.price * item.qty).toLocaleString()} VND</span>
              <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:underline">Xóa</button>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-2">📋 Thông tin đặt hàng</h2>
      <div className="space-y-3">
        <input type="text" placeholder="Tên khách hàng" value={form.customer_name}
          onChange={e => setForm({ ...form, customer_name: e.target.value })}
          className="w-full border rounded p-2" />

        <input type="tel" placeholder="Số điện thoại" value={form.phone_number}
          onChange={e => setForm({ ...form, phone_number: e.target.value })}
          className="w-full border rounded p-2" />

        <input type="text" placeholder="Địa chỉ giao hàng" value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          className="w-full border rounded p-2" />

        <textarea placeholder="Ghi chú (nếu có)" value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className="w-full border rounded p-2" />

        <div className="space-x-4">
          <label>
            <input type="radio" name="payment" value="cash"
              checked={form.payment_method === 'cash'}
              onChange={() => setForm({ ...form, payment_method: 'cash' })} />
            <span className="ml-1">Thanh toán khi nhận hàng</span>
          </label>
          <label>
            <input type="radio" name="payment" value="vnpay"
              checked={form.payment_method === 'vnpay'}
              onChange={() => setForm({ ...form, payment_method: 'vnpay' })} />
            <span className="ml-1">Thanh toán qua VNPay</span>
          </label>
        </div>

        <button onClick={handleOrder} className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
          ✅ Đặt hàng
        </button>
      </div>
    </div>
  );
}
