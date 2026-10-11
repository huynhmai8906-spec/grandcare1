import React, { useEffect } from 'react';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'alert' | 'info';
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isAlert = toast.type === 'alert';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-white ${
          isAlert ? 'bg-emergency-red' : 'bg-sapphire-dispatch'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">
            {isAlert ? 'warning' : 'check'}
          </span>
        </div>
        <div className="flex flex-col pr-2">
          <span className="font-title-sm text-title-sm font-bold leading-tight">
            {toast.title}
          </span>
          <span className="font-body-sm text-body-sm text-white/90 leading-tight mt-0.5">
            {toast.message}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white p-1 rounded-lg"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};
