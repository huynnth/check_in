'use client';
import { useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import axios from 'axios';
import { useAuth } from '@/zustand/store';

export default function CreateUserPage() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await axios.post('/api/admin/create-user', values, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Tạo user thành công');
        } catch (err: any) {
            message.error(err.response?.data?.error || 'Lỗi không xác định');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="email" label="Email" rules={[{ required: true }]}> <Input /> </Form.Item>
                <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}> <Input.Password /> </Form.Item>
                <Form.Item name="role" label="Vai trò" initialValue="USER" rules={[{ required: true }]}> <Select options={[{ label: 'USER', value: 'USER' }, { label: 'ADMIN', value: 'ADMIN' }]} /> </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>Tạo tài khoản</Button>
            </Form>
        </div>
    );
}