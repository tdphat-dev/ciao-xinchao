'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type User = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('users').select('*');

      if (error) {
        console.error('Error fetching users:', error.message);
      } else {
        setUsers(data);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading users...</div>;
  }

  if (!users || users.length === 0) {
    return <div className="p-4 text-center">No users found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registered Users</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.role}</td>
              <td className="p-3 border">{new Date(user.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
