'use client';

import { useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import axios from 'axios';
import { useAuth } from '@/zustand/store';
import { useRouter } from 'next/navigation';

export default function CreateUserPage() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await axios.post('/api/admin/create-user', values, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Tạo user thành công');

            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 1000);
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Đã xảy ra lỗi không xác định';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-md mx-auto mt-10">
            <Form layout="vertical" onFinish={onFinish}>

                <Form.Item
                    name="name"
                    label="Họ Tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="mssv"
                    label="Mã số sinh viên"
                    rules={[{ required: true, message: 'Vui lòng nhập mã số sinh viên' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    name="role"
                    label="Vai trò"
                    initialValue="USER"
                    rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
                >
                    <Select
                        options={[
                            { label: 'USER', value: 'USER' },
                            { label: 'ADMIN', value: 'ADMIN' },
                        ]}
                    />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Tạo tài khoản
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
