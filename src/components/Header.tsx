import React from 'react';

interface HeaderProps {
  onOpenSosModal: () => void;
  hasActiveSos: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSosModal, hasActiveSos }) => {
  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface-clean/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6 border-b border-surface-container/50">
      {/* Left branding */}
      <div className="flex items-center gap-3">
        <img
          alt="GrandCare Medical Logo"
          className="h-8 w-auto object-contain"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkpudh7rAZ96_KIFzvg_Nc-ekqvtyXCIscm3rdlHkrVZ6zoUeVOksm5keD5iXAACxJ1ouSvjL6VddtcPnukhggJ_X-F97D0WywOdw0QaYLUDQWYx1L-ArecOPGiOpvwQx5rM6JBIHkx_W6JmdR5vf2diUcZ_blGZifH8FmKpmfuGBOnvUNoXfkyLFmkDU541kiyND0Wo1fGRJg8BPiNUSm3Lrzflk_Oums4Oh1ZEAF-jFk4lpvQE6P"
        />
        <div className="h-4 w-px bg-outline-variant"></div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-telehealth-teal text-[20px]">
            verified
          </span>
          <span className="font-label-md text-label-md text-on-surface font-semibold">
            Quản Trị Viện Phí &amp; Y Tế Cao Cấp
          </span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* FHIR Gateway Status */}
        <div className="hidden lg:flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-vital-stable animate-pulse"></span>
          <span className="font-label-sm text-label-sm text-on-surface">
            FHIR Gateway:{' '}
            <strong className="text-emerald-deep font-bold">CONNECTED (ms 18)</strong>
          </span>
        </div>

        {/* SOS Alarm Button */}
        <button
          onClick={onOpenSosModal}
          type="button"
          className={`flex items-center gap-2 bg-emergency-red text-on-error px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition-all font-label-md text-label-md font-bold active:scale-95 ${
            hasActiveSos ? 'animate-pulse' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">notification_important</span>
          <span>Báo Động Đỏ SOS</span>
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2 pl-1">
          <div className="hidden md:flex flex-col text-right">
            <span className="font-title-sm text-title-sm text-on-surface font-bold leading-tight">
              GS. Đặng Hoàng Minh
            </span>
            <span className="font-label-sm text-label-sm text-vital-stable font-semibold leading-tight">
              Bác Sĩ Trưởng Ban
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm shadow-sm">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
