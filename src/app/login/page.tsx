'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/zustand/store';
import { Input, Button } from 'antd';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setRole } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token } = res.data;

      const payload = JSON.parse(atob(token.split('.')[1]));

      setToken(token);
      setRole(payload.role);

      toast.success('Đăng nhập thành công!');

      router.push(payload.role === 'ADMIN' ? '/admin/dashboard' : '/user/attendance');
    } catch (err: any) {
      const message = err.response?.data?.error || 'Đăng nhập thất bại!';
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-sm mx-auto mt-10">
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="primary" onClick={handleLogin}>
        Đăng nhập
      </Button>
    </div>
  );
}
