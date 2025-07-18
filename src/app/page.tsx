'use client'

import { useState } from "react";
import { Button, message } from "antd";

export default function Home() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleStartCamera = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    setStream(mediaStream);
    const video = document.getElementById("video") as HTMLVideoElement;
    if (video) video.srcObject = mediaStream;
  };

  const handleCheckIn = async () => {
    const res = await fetch("/api/attendance/check-in", { method: "POST" });
    if (res.ok) {
      message.success("Điểm danh thành công!");
    } else {
      message.error("Điểm danh thất bại!");
    }
  };

  return (
    <div className="p-6 flex flex-col justify-center">
      <h1 className="text-2xl mb-4">Trang điểm danh</h1>
      <video id="video" autoPlay width={800} height={600}></video><br />
      <a className='flex'>
      <Button type="primary" onClick={handleStartCamera} className='ml-auto mr-1'>Mở Camera</Button>
      <Button type="default" onClick={handleCheckIn} className="mr-auto ml-1">Điểm danh</Button>
      </a>
    </div>
  );
}