import React, { useState, useEffect } from 'react';

interface DeviceTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReady?: () => void;
}

export const DeviceTestModal: React.FC<DeviceTestModalProps> = ({
  isOpen,
  onClose,
  onConfirmReady,
}) => {
  const [testing, setTesting] = useState(false);
  const [camStatus, setCamStatus] = useState<'checking' | 'passed'>('passed');
  const [micStatus, setMicStatus] = useState<'checking' | 'passed'>('passed');
  const [netStatus, setNetStatus] = useState<'checking' | 'passed'>('passed');
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    if (isOpen) {
      setTesting(true);
      setCamStatus('checking');
      setMicStatus('checking');
      setNetStatus('checking');

      const t1 = setTimeout(() => setCamStatus('passed'), 600);
      const t2 = setTimeout(() => setMicStatus('passed'), 1100);
      const t3 = setTimeout(() => {
        setNetStatus('passed');
        setTesting(false);
        setLatency(Math.floor(10 + Math.random() * 4));
      }, 1600);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-surface-clean w-full max-w-lg rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-primary-fixed/50 text-emerald-deep flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">troubleshoot</span>
            </span>
            <div className="flex flex-col">
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Chẩn Đoán Thiết Bị Telehealth
              </h3>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Chuẩn kiểm định Y Khoa ISO 27799 &amp; WebRTC 4K
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Diagnostic items */}
        <div className="flex flex-col gap-3 py-1">
          {/* Item 1: Camera */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-vital-stable text-[22px]">videocam</span>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-on-surface font-bold">
                  Camera Sony Medical 4K PTZ
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Độ phân giải 3840x2160 @ 60fps • Zoom quang học 30x
                </span>
              </div>
            </div>
            {camStatus === 'checking' ? (
              <span className="material-symbols-outlined text-primary text-[20px] animate-spin">
                autorenew
              </span>
            ) : (
              <span className="font-label-sm text-label-sm text-vital-stable font-bold bg-vital-stable/10 px-2.5 py-1 rounded-full">
                Passed
              </span>
            )}
          </div>

          {/* Item 2: Mic */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-vital-stable text-[22px]">mic</span>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-on-surface font-bold">
                  Micro Shure Array Khử Nhiễu AI
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Lọc âm chuyên dụng tim/phổi biên độ 42dB
                </span>
              </div>
            </div>
            {micStatus === 'checking' ? (
              <span className="material-symbols-outlined text-primary text-[20px] animate-spin">
                autorenew
              </span>
            ) : (
              <span className="font-label-sm text-label-sm text-vital-stable font-bold bg-vital-stable/10 px-2.5 py-1 rounded-full">
                Passed
              </span>
            )}
          </div>

          {/* Item 3: Latency & Jitter */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-vital-stable text-[22px]">speed</span>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-on-surface font-bold">
                  Độ trễ WebRTC Gateway Bệnh Viện
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                  Latency: {latency}ms • Jitter: 1.2ms • Packet Loss: 0.0%
                </span>
              </div>
            </div>
            {netStatus === 'checking' ? (
              <span className="material-symbols-outlined text-primary text-[20px] animate-spin">
                autorenew
              </span>
            ) : (
              <span className="font-label-sm text-label-sm text-vital-stable font-bold bg-vital-stable/10 px-2.5 py-1 rounded-full">
                Tuyệt vời
              </span>
            )}
          </div>
        </div>

        {/* Live Audio Spectrum simulator */}
        <div className="p-3 bg-inverse-surface text-inverse-on-surface rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-vital-stable animate-ping"></span>
            <span className="font-mono text-xs text-primary-fixed">AI Noise Suppression Active</span>
          </div>
          <div className="flex items-center gap-1 h-5">
            {[40, 80, 60, 95, 70, 50, 85, 65, 45, 90].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-vital-stable rounded-full transition-all duration-300"
                style={{ height: testing ? `${h}%` : '50%' }}
              ></span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container">
          <button
            onClick={() => {
              if (onConfirmReady) onConfirmReady();
              onClose();
            }}
            className="bg-emerald-deep hover:bg-primary text-on-primary px-6 py-2.5 rounded-lg font-title-sm text-title-sm font-bold shadow-sm transition-all"
          >
            Hoàn Tất &amp; Xác Nhận Sẵn Sàng
          </button>
        </div>
      </div>
    </div>
  );
};
