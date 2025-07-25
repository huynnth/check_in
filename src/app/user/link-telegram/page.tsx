'use client';
import { useState } from 'react';
import { Button, Input, message } from 'antd';
import axios from 'axios';
import { useAuth } from '@/zustand/store';

export default function LinkTelegram() {
    const { token } = useAuth();
    const [telegramId, setTelegramId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post('/api/user/link-telegram', { telegramId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Liên kết Telegram thành công');
        } catch (err: any) {
            message.error(err.response?.data?.error || 'Lỗi không xác định');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <Input placeholder="Nhập Telegram ID" value={telegramId} onChange={(e) => setTelegramId(e.target.value)} />
            <Button type="primary" onClick={handleSubmit} loading={loading}>Liên kết</Button>
        </div>
    );
}