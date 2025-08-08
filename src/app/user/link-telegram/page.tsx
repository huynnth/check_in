'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button, Typography, message, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function LinkTelegramPage() {
    const searchParams = useSearchParams();
    const telegramId = searchParams.get('telegramId');
    const chatId = searchParams.get('chatId');

    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLink = async () => {
        try {
            const res = await fetch('/api/telegram/link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ telegramId, chatId }),
            });

            const data = await res.json();
            if (data.success) {
                setStatus('success');
                message.success(' Liên kết Telegram thành công!');
            } else {
                setStatus('error');
                setErrorMsg(data.error || 'Lỗi không xác định');
                message.error(` ${data.error || 'Không thể liên kết'}`);
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg('Gặp lỗi khi gửi yêu cầu');
            message.error(' Gặp lỗi khi kết nối máy chủ.');
        }
    };

    return (
        <div style={{ padding: 32, maxWidth: 480, margin: '0 auto' }}>
            <Typography>
                <Title level={3}>Liên kết Telegram</Title>
                <Paragraph>
                    Hãy nhấn nút bên dưới để xác nhận liên kết tài khoản Telegram của bạn.
                </Paragraph>
            </Typography>

            <Space direction="vertical">
                <Button type="primary" onClick={handleLink}>
                    Xác nhận liên kết
                </Button>

                {status === 'success' && (
                    <Text type="success"> Đã liên kết thành công.</Text>
                )}
                {status === 'error' && (
                    <Text type="danger"> {errorMsg}</Text>
                )}
            </Space>
        </div>
    );
}
