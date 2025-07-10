'use client';

import React, { useEffect, useState } from 'react';

export default function MenuPage() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error('Failed to fetch menu', err));
  }, []);

  return (
    <main style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem' }}>Menu</h1>
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} VND
          </li>
        ))}
      </ul>
    </main>
  );
}
