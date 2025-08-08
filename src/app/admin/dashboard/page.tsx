'use client';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { Table, Tag, Button, FloatButton, Tooltip } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useAuth } from '@/zustand/store';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import type { TooltipProps } from 'antd';


export default function Dashboard() {
  const { token } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const router = useRouter();
  const text = <span>Đăng kí sinh viên</span>;

  const [arrow, setArrow] = useState<'Show' | 'Hide' | 'Center'>('Show');

  const mergedArrow = useMemo<TooltipProps['arrow']>(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

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

  const handleClick = () => {
    router.push('/admin/create-user');
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Họ Tên',
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: 'Mã số sinh viên',
      dataIndex: 'mssv',
      fixed: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      fixed: 'left',
    },
    {
      title: 'Số buổi vắng',
      dataIndex: 'absentCount',
      fixed: 'left',
    },
    ...dates.map((d) => ({
      title: d,
      dataIndex: d,
      render: (present: boolean) => (present ? '✓' : <Tag color="red">X</Tag>),
    })),
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="email" scroll={{ x: true }} />

      <Tooltip placement="left" title={text} arrow={mergedArrow}>
        <FloatButton
          onClick={handleClick}
          shape="circle"
          type="primary"
          style={{ insetInlineEnd: 100, border: '2px solid blue' }}
          icon={<UserAddOutlined />}

        />
      </Tooltip>
    </div>
  )
}