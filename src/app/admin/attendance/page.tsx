'use client'

import { useQuery } from "react-query";
import { Table } from "antd";

// export default function AttendanceList() {
//   const { data, isLoading } = useQuery("attendance", async () => {
//     const res = await fetch("/api/attendance/today");
//     return res.json();
//   });

  export default function AttendanceList() {
    const { data, isLoading } = useQuery({
      queryKey: ['attendance'],
      queryFn: async () => {
        const res = await fetch('/api/attendance/today')
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      },
    })
  
    if (isLoading) return <p>Loading...</p>
    return <pre>{JSON.stringify(data, null, 2)}</pre>
  
  
  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "MSSV", dataIndex: "studentId", key: "studentId" },
    { title: "Đã điểm danh", dataIndex: "present", key: "present", render: (val: boolean) => val ? "✔️" : "❌" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Điểm danh hôm nay</h1>
      <Table columns={columns} dataSource={data} loading={isLoading} rowKey="id" />
    </div>
  );
}