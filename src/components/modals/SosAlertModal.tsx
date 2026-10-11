import React from 'react';
import { RoomData } from '../../types';

interface SosAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSosRooms: RoomData[];
  onResolveRoom: (roomId: string) => void;
  onTriggerCodeRed?: () => void;
}

export const SosAlertModal: React.FC<SosAlertModalProps> = ({
  isOpen,
  onClose,
  activeSosRooms,
  onResolveRoom,
  onTriggerCodeRed,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-surface-clean w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border-2 border-emergency-red flex flex-col">
        {/* Banner */}
        <div className="bg-emergency-red text-on-error p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-full bg-surface-container-lowest/20 flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined text-[28px] text-white">e911_emergency</span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm font-bold text-white tracking-wide">
                  TRUNG TÂM BÁO ĐỘNG ĐỎ CẤP CỨU (CODE RED)
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-white/90">
                Giao thức hồi sức cấp 1 &amp; điều phối trực tức thời của Viện Trưởng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          <div className="flex items-center justify-between">
            <span className="font-title-sm text-title-sm font-bold text-primary uppercase tracking-wider">
              Các buồng bệnh đang phát tín hiệu khẩn:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-error-container text-emergency-red font-label-sm text-label-sm font-bold animate-pulse">
              {activeSosRooms.length} Vị trí cần can thiệp
            </span>
          </div>

          {activeSosRooms.length === 0 ? (
            <div className="p-8 text-center bg-vital-stable/10 rounded-xl text-vital-stable">
              <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
              <p className="font-title-md text-title-md font-bold">Toàn bộ 52 buồng bệnh đang trong tầm kiểm soát!</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Không có chuông khẩn cấp chưa xử lý.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {activeSosRooms.map((room) => (
                <div
                  key={room.id}
                  className="p-4 rounded-xl bg-error-container/30 border border-emergency-red/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-emergency-red text-white flex items-center justify-center font-bold text-base shrink-0">
                      {room.id}
                    </span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-title-md text-title-md font-bold text-primary">
                          {room.name} ({room.wingName})
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emergency-red text-white font-label-sm text-label-sm font-bold">
                          Khẩn cấp
                        </span>
                      </div>
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold mt-0.5">
                        {room.patientName} {room.patientAge && `(${room.patientAge}t)`}
                      </span>
                      {room.vitals?.notes && (
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          {room.vitals.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <button
                      onClick={() => onResolveRoom(room.id)}
                      className="px-4 py-2 rounded-lg bg-emergency-red text-white hover:bg-error font-title-sm text-title-sm font-bold shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>Xác Nhận Đã Đến Nơi</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Emergency Hotline actions */}
          <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3">
            <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
              Kênh lệnh điều động khẩn cấp:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  if (onTriggerCodeRed) onTriggerCodeRed();
                  alert('ĐÃ KÍCH HOẠT: Kênh phát thanh Báo Động Đỏ toàn viện! Toàn bộ bác sĩ hồi sức trực cấp 1 có mặt trong 3 phút.');
                }}
                className="p-3 rounded-lg bg-surface-container-highest hover:bg-surface-variant text-on-surface font-title-sm text-title-sm font-bold flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-emergency-red text-[20px]">campaign</span>
                <span>Phát Thanh Khẩn Toàn Viện</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('ĐÃ ĐIỀU PHỐI: Mở phòng Cathlab #01 và kích hoạt kíp Tim mạch can thiệp PGS.TS Trần Vinh Quang.');
                }}
                className="p-3 rounded-lg bg-emerald-deep hover:bg-primary text-on-primary font-title-sm text-title-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">meeting_room</span>
                <span>Sẵn Sàng Cathlab Can Thiệp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-container-low border-t border-surface-container flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Tần số vô tuyến cấp cứu: 154.250 MHz (Kết nối tốt)
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-surface-clean text-on-surface font-title-sm text-title-sm font-semibold hover:bg-surface-container transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
