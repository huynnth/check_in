'use client';
import { useAuth } from '@/zustand/store';
import axios from 'axios';
import { Button, message } from 'antd';
import { useEffect, useState } from 'react';

export default function AttendancePage() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleMarkAttendance = async () => {
        setLoading(true);
        try {
            await axios.post('/api/attendance/mark', {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Điểm danh thành công!');
        } catch (err: any) {
            message.error(err.response?.data?.error || 'Lỗi không xác định');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Button type="primary" onClick={handleMarkAttendance} loading={loading}>
                Điểm danh hôm nay
            </Button>
        </div>
    );
}