import React from 'react';
import { NavTab } from '../types';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenSosModal: () => void;
  hasActiveSos: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSosModal,
  hasActiveSos,
}) => {
  const navItems: Array<{
    id: NavTab;
    label: string;
    icon: string;
  }> = [
    { id: 'dashboard', label: 'Trang Chủ & Tổng Quan', icon: 'grid_view' },
    { id: 'ehr', label: 'Hồ Sơ Bệnh Nhân EHR', icon: 'clinical_notes' },
    { id: 'pharmacy', label: 'Kho Dược & Đơn Thuốc', icon: 'medication' },
    { id: 'doctors', label: 'Bác Sĩ & Hội Đồng Y Khoa', icon: 'badge' },
    { id: 'telehealth', label: 'Lịch Khám & Telehealth', icon: 'video_camera_front' },
    { id: 'rooms', label: 'Sơ Đồ Phòng & Giường Bệnh', icon: 'single_bed' },
    { id: 'dispatch', label: 'Cấp Cứu 115 & Dijkstra GPS', icon: 'emergency' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-clean shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto">
      <div className="p-6">
        {/* Logo lockup */}
        <div
          onClick={() => onSelectTab('dashboard')}
          className="flex items-center gap-3 mb-6 cursor-pointer group"
        >
          <img
            alt="GrandCare Medical Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkpudh7rAZ96_KIFzvg_Nc-ekqvtyXCIscm3rdlHkrVZ6zoUeVOksm5keD5iXAACxJ1ouSvjL6VddtcPnukhggJ_X-F97D0WywOdw0QaYLUDQWYx1L-ArecOPGiOpvwQx5rM6JBIHkx_W6JmdR5vf2diUcZ_blGZifH8FmKpmfuGBOnvUNoXfkyLFmkDU541kiyND0Wo1fGRJg8BPiNUSm3Lrzflk_Oums4Oh1ZEAF-jFk4lpvQE6P"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary leading-tight font-bold tracking-tight">
              GrandCare
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              EHR &amp; Ops Suite
            </span>
          </div>
        </div>

        {/* Status Chip */}
        <div className="mb-4 p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-vital-stable animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-on-surface font-bold">
              HL7 FHIR R4 Live
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded">
            99.98%
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-title-sm text-title-sm leading-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer area */}
      <div className="p-6 bg-surface-container-lowest mt-auto border-t border-surface-container/60">
        {/* SOS Emergency button */}
        <button
          onClick={onOpenSosModal}
          type="button"
          className="w-full p-2.5 rounded-lg bg-error-container text-on-error-container flex items-center justify-between mb-3 hover:opacity-95 transition-opacity shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emergency-red text-[18px]">
              e911_emergency
            </span>
            <span className="font-label-md text-label-md font-bold text-emergency-red">
              Kênh SOS Trực Ban
            </span>
          </div>
          <span
            className={`w-2.5 h-2.5 rounded-full bg-emergency-red ${
              hasActiveSos ? 'animate-ping' : ''
            }`}
          ></span>
        </button>

        {/* Doctor profile */}
        <div className="flex items-center gap-3 pt-1">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
            GS
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface font-bold truncate">
              GS. Đặng Hoàng Minh
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
              Viện Trưởng Điều Hành
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
