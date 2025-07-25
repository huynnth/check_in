'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { useAuth } from '@/zustand/store';
import dayjs from 'dayjs';

export default function Dashboard() {
  const { token } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/admin/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.users);
      setDates(res.data.dates);
    };
    fetchData();
  }, [token]);

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      fixed: 'left',
    },
    ...dates.map((d) => ({
      title: d,
      dataIndex: d,
      render: (present: boolean) => present ? '✓' : <Tag color="red">X</Tag>,
    })),
    {
      title: 'Số buổi vắng',
      dataIndex: 'absentCount',
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="email" scroll={{ x: true }} />;
}