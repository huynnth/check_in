'use client'

import { useQuery } from "react-query";
import { Table } from "antd";

export default function AdminStudents() {
  const { data, isLoading } = useQuery("students", async () => {
    const res = await fetch("/api/students");
    return res.json();
  });

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "MSSV", dataIndex: "studentId", key: "studentId" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Danh sách sinh viên</h1>
      <Table columns={columns} dataSource={data} loading={isLoading} rowKey="id" />
    </div>
  );
}