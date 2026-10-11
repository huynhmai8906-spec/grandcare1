import React, { useState } from 'react';
import { RoomData } from '../../types';

interface RoomsScreenProps {
  rooms: RoomData[];
  onUpdateRoomStatus: (roomId: string, status: RoomData['status']) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'alert') => void;
}

export const RoomsScreen: React.FC<RoomsScreenProps> = ({
  rooms,
  onUpdateRoomStatus,
  onShowToast,
}) => {
  const [selectedWing, setSelectedWing] = useState<'all' | 'wing1' | 'wing2' | 'wing3'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'occupied' | 'vacant' | 'hepa' | 'sos'>('all');
  const [roomTemp, setRoomTemp] = useState<number>(23.5);
  const [activeBedMode, setActiveBedMode] = useState<'0' | '30' | '65'>('30');
  const [sosBannerDismissed, setSosBannerDismissed] = useState(false);

  const room205 = rooms.find((r) => r.id === '205');
  const is205Sos = room205?.status === 'sos';

  const occupiedCount = rooms.filter((r) => r.status === 'occupied').length + 35;
  const vacantCount = rooms.filter((r) => r.status === 'vacant').length + 6;
  const sosCount = rooms.filter((r) => r.status === 'sos').length;

  const filteredRooms = rooms.filter((room) => {
    const matchesWing = selectedWing === 'all' || room.wingKey === selectedWing;
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesWing && matchesStatus;
  });

  const handleAcknowledgeSos = (roomId: string) => {
    onUpdateRoomStatus(roomId, 'occupied');
    setSosBannerDismissed(true);
    onShowToast(
      'Đã Xử Lý Khẩn Cấp',
      `Điều dưỡng trưởng Lê Thị Ngọc Bích đã có mặt xử lý buồng bệnh ${roomId}. Chuông khẩn cấp đã tắt an toàn.`
    );
  };

  const handleTestAllBells = () => {
    onShowToast(
      'Kiểm Tra Chuông Toàn Viện',
      'Đang phát tín hiệu tần số 433MHz đến 52 phòng... Tất cả 52/52 mô-đun IoT phản hồi: BÌNH THƯỜNG (0 lỗi).'
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-6 py-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        {/* TOP CLINICAL CONTROL BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container/60">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-clinical-amber font-bold">
                Geriatric Concierge &amp; Smart Ward OS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Khu Y Tế Nghỉ Dưỡng Lão Khoa Cao Cấp
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
              Sơ Đồ Phòng Nghỉ Dưỡng &amp; Giường Bệnh Y Tế Cao Cấp
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Giám sát trạng thái 52 buồng bệnh thông minh, điều phối dưỡng khí HEPA và liên lạc khẩn cấp trực tức thời.
            </p>
          </div>

          {/* Quick Status Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface-container-low px-4 py-2.5 rounded-xl flex flex-col min-w-[110px] border border-surface-container/50">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                TỔNG PHÒNG
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">52</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">phòng</span>
              </div>
            </div>

            <div className="bg-primary-container/10 px-4 py-2.5 rounded-xl flex flex-col min-w-[110px] border border-primary/10">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-bold">ĐANG Ở</span>
                <span className="w-2 h-2 rounded-full bg-primary"></span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  {occupiedCount}
                </span>
                <span className="font-label-sm text-label-sm text-primary/70">73.1%</span>
              </div>
            </div>

            <div className="bg-vital-stable/10 px-4 py-2.5 rounded-xl flex flex-col min-w-[110px] border border-vital-stable/15">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-vital-stable font-bold">
                  SẴN SÀNG
                </span>
                <span className="w-2 h-2 rounded-full bg-vital-stable"></span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-sm text-headline-sm text-vital-stable font-bold">
                  {vacantCount}
                </span>
                <span className="font-label-sm text-label-sm text-vital-stable/80">Trống</span>
              </div>
            </div>

            <div
              className={`px-4 py-2.5 rounded-xl flex flex-col min-w-[110px] border ${
                sosCount > 0
                  ? 'bg-error-container border-emergency-red/30 animate-pulse'
                  : 'bg-surface-container-low border-surface-container'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-emergency-red font-bold">
                  SOS KHẨN CẤP
                </span>
                <span className="material-symbols-outlined text-emergency-red text-base">
                  emergency
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-sm text-headline-sm text-emergency-red font-bold">
                  {sosCount}
                </span>
                <span className="font-label-sm text-label-sm text-on-error-container">chuông</span>
              </div>
            </div>
          </div>
        </div>

        {/* PERSISTENT SOS ALERT BANNER */}
        {is205Sos && !sosBannerDismissed && (
          <div className="bg-error text-on-error p-4 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300">
            <div className="flex items-start md:items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest/20 flex items-center justify-center shrink-0 animate-bounce">
                <span className="material-symbols-outlined text-on-error text-2xl">
                  notifications_active
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-title-sm text-title-sm font-bold uppercase tracking-wide">
                    Cảnh Báo Khẩn Cấp Cấp Độ 1 (Red-1 Alert)
                  </span>
                  <span className="bg-surface-container-lowest text-emergency-red px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold">
                    09:14:22 AM
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-error/90 mt-0.5">
                  Phòng 205 (Bệnh nhân: <strong>Trần Thị Mai - 82 tuổi</strong>) kích hoạt chuông đầu giường. Chỉ số nhịp tim vọt 134 bpm, SpO2 91%. Điều dưỡng phụ trách: Lê Thị Ngọc Bích.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 self-end md:self-center shrink-0">
              <button
                onClick={() => handleAcknowledgeSos('205')}
                className="bg-surface-container-lowest text-emergency-red hover:bg-surface-container-low px-4 py-2.5 rounded-xl font-title-sm text-title-sm font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Tắt Chuông &amp; Xác Nhận Đến Nơi</span>
              </button>
            </div>
          </div>
        )}

        {/* MAIN 2-COLUMN OPERATIONAL GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT 8 COLS: FILTERS & INTERACTIVE ROOM MATRIX */}
          <div className="xl:col-span-8 flex flex-col gap-4">
            {/* WING SELECTION TABS & VIEW OPTIONS */}
            <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setSelectedWing('all')}
                  className={`px-4 py-2 rounded-xl font-title-sm text-title-sm font-semibold transition-all whitespace-nowrap ${
                    selectedWing === 'all'
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Toàn Khu Vực (52)
                </button>
                <button
                  onClick={() => setSelectedWing('wing1')}
                  className={`px-4 py-2 rounded-xl font-title-sm text-title-sm transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedWing === 'wing1'
                      ? 'bg-primary-container text-on-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-clinical-amber"></span>
                  Villa Sen Vàng Sala (16)
                </button>
                <button
                  onClick={() => setSelectedWing('wing2')}
                  className={`px-4 py-2 rounded-xl font-title-sm text-title-sm transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedWing === 'wing2'
                      ? 'bg-primary-container text-on-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-telehealth-teal"></span>
                  Premier Bạch Đằng (20)
                </button>
                <button
                  onClick={() => setSelectedWing('wing3')}
                  className={`px-4 py-2 rounded-xl font-title-sm text-title-sm transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedWing === 'wing3'
                      ? 'bg-primary-container text-on-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-sapphire-dispatch"></span>
                  Sanctuary Thảo Điền (16)
                </button>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 text-on-surface-variant font-label-md text-label-md">
                  <span className="material-symbols-outlined text-base">tune</span>
                  <span>Lọc tình trạng:</span>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-surface-container-low text-on-surface font-title-sm text-title-sm rounded-lg px-3 py-1.5 focus:outline-none border border-surface-container"
                >
                  <option value="all">Tất cả tình trạng</option>
                  <option value="occupied">Đang có khách</option>
                  <option value="vacant">Đang trống</option>
                  <option value="hepa">Đang khử khuẩn HEPA</option>
                  <option value="sos">Cảnh báo SOS</option>
                </select>
              </div>
            </div>

            {/* ROOM MATRIX GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRooms.map((room) => {
                const isSos = room.status === 'sos';
                const isOccupied = room.status === 'occupied';
                const isHepa = room.status === 'hepa';
                const isVacant = room.status === 'vacant';

                return (
                  <div
                    key={room.id}
                    className={`bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between border ${
                      isSos
                        ? 'border-emergency-red/50 shadow-md ring-2 ring-emergency-red/20'
                        : 'border-surface-container/60'
                    }`}
                  >
                    {isSos && (
                      <div className="absolute -top-2.5 right-3 bg-emergency-red text-on-error font-label-sm text-label-sm px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm animate-pulse">
                        <span className="material-symbols-outlined text-xs">emergency</span>
                        <span>CHUÔNG SOS ĐANG GỌI</span>
                      </div>
                    )}

                    <div className="space-y-3 pt-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-label-sm text-label-sm text-clinical-amber font-bold uppercase">
                            {room.wingName}
                          </span>
                          <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
                            {room.name}
                            <span
                              className="material-symbols-outlined text-vital-stable text-lg"
                              title="Giường thông minh kết nối liên tục"
                            >
                              sensors
                            </span>
                          </h3>
                        </div>

                        {isSos && (
                          <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                            SOS Cấp 1
                          </span>
                        )}
                        {isOccupied && (
                          <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">
                            Có Khách
                          </span>
                        )}
                        {isHepa && (
                          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs animate-spin">cyclone</span>
                            HEPA 99.9%
                          </span>
                        )}
                        {isVacant && (
                          <span className="px-2 py-0.5 rounded-full bg-vital-stable/20 text-vital-stable font-label-sm text-label-sm font-bold">
                            Sẵn Sàng Đón
                          </span>
                        )}
                      </div>

                      {/* Content Card Body */}
                      {isSos && (
                        <div className="bg-error-container/40 p-3 rounded-xl space-y-1 border border-emergency-red/20">
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Bệnh nhân nghỉ dưỡng:
                            </span>
                            <span className="font-label-sm text-label-sm text-emergency-red font-bold">
                              {room.patientCode}
                            </span>
                          </div>
                          <p className="font-title-md text-title-md text-on-surface font-bold">
                            {room.patientName} {room.patientAge && `(${room.patientAge}t)`}
                          </p>
                          <div className="grid grid-cols-2 gap-1 text-xs pt-1 text-on-surface-variant font-body-sm">
                            {room.vitals?.hr && (
                              <div>
                                Nhịp tim: <strong className="text-emergency-red font-bold">{room.vitals.hr} bpm ↑</strong>
                              </div>
                            )}
                            {room.vitals?.spo2 && (
                              <div>
                                SpO2: <strong className="text-emergency-red font-bold">{room.vitals.spo2}% ↓</strong>
                              </div>
                            )}
                            <div>Tư thế: <strong>{room.bedMode || 'Nâng lưng 45°'}</strong></div>
                            <div>Đệm khí: <strong>Chống loét 8 chu kỳ</strong></div>
                          </div>
                        </div>
                      )}

                      {isOccupied && (
                        <div className="bg-surface-container-low p-3 rounded-xl space-y-1 border border-surface-container/50">
                          <div className="flex items-center justify-between">
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Khách lưu trú dài hạn:
                            </span>
                            <span className="font-label-sm text-label-sm text-primary font-bold">
                              {room.patientCode}
                            </span>
                          </div>
                          <p className="font-title-md text-title-md text-on-surface font-bold">
                            {room.patientName} {room.patientAge && `(${room.patientAge}t)`}
                          </p>
                          <div className="grid grid-cols-2 gap-1 text-xs pt-1 text-on-surface-variant font-body-sm">
                            {room.vitals?.hr && (
                              <div>Nhịp tim: <strong className="text-vital-stable font-bold">{room.vitals.hr} bpm</strong></div>
                            )}
                            {room.vitals?.bp && (
                              <div>Huyết áp: <strong className="text-vital-stable font-bold">{room.vitals.bp}</strong></div>
                            )}
                            <div>Tư thế: <strong>{room.bedMode || 'Dưỡng Tim 30°'}</strong></div>
                            <div>Cảm biến ngã: <strong className="text-vital-stable font-bold">Bảo vệ Bật</strong></div>
                          </div>
                        </div>
                      )}

                      {isHepa && (
                        <div className="bg-secondary-fixed/30 p-3 rounded-xl space-y-1.5 border border-secondary-fixed">
                          <span className="font-label-sm text-label-sm text-secondary font-bold">
                            QUY TRÌNH KHỬ KHUẨN TỰ ĐỘNG
                          </span>
                          <p className="font-title-sm text-title-sm text-on-surface font-semibold">
                            Tia UV-C &amp; Màng lọc HEPA H14
                          </p>
                          <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden mt-1">
                            <div
                              className="bg-secondary h-full rounded-full transition-all duration-500"
                              style={{ width: `${room.hepaPercent || 68}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center text-xs text-on-surface-variant font-body-sm">
                            <span>Thời gian còn lại: <strong>{room.hepaRemainingMin || 14} phút</strong></span>
                            <span className="font-bold text-secondary">{room.hepaPercent || 68}%</span>
                          </div>
                        </div>
                      )}

                      {isVacant && (
                        <div className="bg-surface-container-low p-3 rounded-xl space-y-1 border border-surface-container/50">
                          <div className="flex items-center gap-1.5 text-vital-stable">
                            <span className="material-symbols-outlined text-base">check_circle</span>
                            <span className="font-title-sm text-title-sm font-bold">
                              Phòng Đã Sạch Hoàn Toàn
                            </span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                            Khử khuẩn lúc 07:30. Khí quyển đạt chuẩn phòng mổ quốc tế. Ga giường thay mới chuẩn y khoa 5 sao.
                          </p>
                          <div className="flex items-center justify-between text-xs pt-1 text-on-surface-variant font-body-sm">
                            <span>Nhiệt độ phòng: <strong>23.5°C</strong></span>
                            <span>Áp lực âm: <strong>Bình thường</strong></span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 1-Touch Status Switch Buttons */}
                    <div className="pt-4 mt-2 space-y-1.5 border-t border-surface-container">
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        Chuyển trạng thái tức thì 1-chạm:
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => {
                            onUpdateRoomStatus(room.id, 'vacant');
                            onShowToast(`Phòng ${room.id}`, 'Đã chuyển sang trạng thái [ĐẶT TRỐNG].');
                          }}
                          className={`py-1.5 px-1 rounded-lg font-label-sm text-label-sm font-semibold transition-colors text-center ${
                            isVacant
                              ? 'bg-vital-stable text-on-primary font-bold'
                              : 'bg-surface-container-low hover:bg-vital-stable/20 text-on-surface'
                          }`}
                        >
                          Đặt Trống
                        </button>
                        <button
                          onClick={() => {
                            onUpdateRoomStatus(room.id, 'occupied');
                            onShowToast(`Phòng ${room.id}`, 'Đã chuyển sang trạng thái [CÓ KHÁCH].');
                          }}
                          className={`py-1.5 px-1 rounded-lg font-label-sm text-label-sm font-semibold transition-colors text-center ${
                            isOccupied
                              ? 'bg-primary text-on-primary font-bold'
                              : 'bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface'
                          }`}
                        >
                          Có Khách
                        </button>
                        <button
                          onClick={() => {
                            onUpdateRoomStatus(room.id, 'hepa');
                            onShowToast(`Phòng ${room.id}`, 'Bật chu trình [KHỬ KHUẨN HEPA 99.9%].');
                          }}
                          className={`py-1.5 px-1 rounded-lg font-label-sm text-label-sm font-semibold transition-colors text-center ${
                            isHepa
                              ? 'bg-secondary text-on-secondary font-bold'
                              : 'bg-surface-container-low hover:bg-secondary-fixed text-on-surface'
                          }`}
                        >
                          Khử HEPA
                        </button>
                      </div>

                      {isSos && (
                        <button
                          onClick={() => handleAcknowledgeSos(room.id)}
                          className="w-full mt-1.5 py-2 bg-emergency-red text-on-error rounded-xl font-title-sm text-title-sm font-bold flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-sm">notifications_off</span>
                          <span>Tắt Chuông Khẩn</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Informative Legend Footer */}
            <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container/60 flex flex-wrap items-center justify-between gap-4 text-xs text-on-surface-variant font-body-sm">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span>Có khách lưu trú</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-vital-stable"></span>
                  <span>Phòng sạch sẵn sàng đón</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <span>Đang khử khuẩn lọc HEPA H14</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emergency-red"></span>
                  <span>Báo động chuông SOS tức thì</span>
                </div>
              </div>
              <div className="flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold">
                <span className="material-symbols-outlined text-sm">sync</span>
                <span>Đồng bộ IoT Giường Bệnh: 2 Giây/lần</span>
              </div>
            </div>
          </div>

          {/* RIGHT 4 COLS: SMART ROOM CONTROL & NURSE STATION CALL */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            {/* VIP Smart Room Climate & HEPA Automation Panel */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container/60 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">air</span>
                  </div>
                  <div>
                    <h2 className="font-title-md text-title-md text-primary font-bold">
                      Khí Quyển &amp; Điều Khiển VIP
                    </h2>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Phòng VIP 301 (Villa Sen Vàng)
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-vital-stable/20 text-vital-stable font-label-sm text-label-sm font-bold">
                  Tối Ưu Y Tế
                </span>
              </div>

              {/* Temperature Slider Control */}
              <div className="space-y-2 bg-surface-container-low p-4 rounded-xl border border-surface-container/50">
                <div className="flex justify-between items-center">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-base text-primary">thermostat</span>
                    Nhiệt độ phòng ngủ
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    {roomTemp.toFixed(1)}°C
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="28"
                  step="0.5"
                  value={roomTemp}
                  onChange={(e) => setRoomTemp(parseFloat(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-surface-container-highest rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-on-surface-variant font-label-sm">
                  <span>20.0°C (Mát)</span>
                  <span>Chuẩn Dưỡng Lão: 23° - 25°C</span>
                  <span>28.0°C (Ấm)</span>
                </div>
              </div>

              {/* Humidity & Air Purity Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col justify-between border border-surface-container/50">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="font-label-sm text-label-sm">Độ ẩm tương đối</span>
                    <span className="material-symbols-outlined text-sm text-secondary">water_drop</span>
                  </div>
                  <div className="mt-1">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">54%</span>
                    <p className="font-label-sm text-label-sm text-vital-stable font-semibold mt-0.5">
                      Lý tưởng đường hô hấp
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col justify-between border border-surface-container/50">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="font-label-sm text-label-sm">Chỉ số bụi mịn PM2.5</span>
                    <span className="material-symbols-outlined text-sm text-primary">filter_alt</span>
                  </div>
                  <div className="mt-1">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">4.2</span>
                    <span className="text-xs text-on-surface-variant font-body-sm"> µg/m³</span>
                    <p className="font-label-sm text-label-sm text-vital-stable font-semibold mt-0.5">
                      Cực Sạch (Lớp H14)
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Bed Positioning Modes */}
              <div className="space-y-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wide">
                  Chế độ giường điện tử 1-chạm:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setActiveBedMode('0');
                      onShowToast('Tư Thế Giường', 'Đã chuyển giường về chế độ Nghỉ Ngơi (Góc nâng 0°).');
                    }}
                    className={`py-2.5 px-1 rounded-xl font-label-sm text-label-sm font-semibold transition-colors flex flex-col items-center gap-1 border ${
                      activeBedMode === '0'
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container-low border-surface-container hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">bed</span>
                    <span>Nghỉ Ngơi 0°</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveBedMode('30');
                      onShowToast('Tư Thế Giường', 'Đã chuyển giường về chế độ Dưỡng Tim (Góc nâng 30°).');
                    }}
                    className={`py-2.5 px-1 rounded-xl font-label-sm text-label-sm font-semibold transition-colors flex flex-col items-center gap-1 border ${
                      activeBedMode === '30'
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container-low border-surface-container hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">airline_seat_recline_normal</span>
                    <span>Dưỡng Tim 30°</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveBedMode('65');
                      onShowToast('Tư Thế Giường', 'Đã chuyển giường về chế độ Ăn Uống (Góc nâng 65°).');
                    }}
                    className={`py-2.5 px-1 rounded-xl font-label-sm text-label-sm font-semibold transition-colors flex flex-col items-center gap-1 border ${
                      activeBedMode === '65'
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container-low border-surface-container hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">restaurant</span>
                    <span>Ăn Uống 65°</span>
                  </button>
                </div>
              </div>
            </div>

            {/* REAL-TIME NURSE ON DUTY STATION */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container/60 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-vital-stable/20 text-vital-stable flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">medical_services</span>
                  </div>
                  <div>
                    <h2 className="font-title-md text-title-md text-primary font-bold">
                      Kíp Điều Dưỡng Trực Tầng
                    </h2>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Ca Sáng (07:00 - 15:00)
                    </span>
                  </div>
                </div>
                <span
                  className="w-2.5 h-2.5 rounded-full bg-vital-stable animate-pulse"
                  title="Tất cả điều dưỡng đang giữ liên lạc bộ đàm"
                ></span>
              </div>

              {/* Head Nurse Card */}
              <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-surface-container/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-title-lg text-title-lg font-bold shrink-0">
                    NB
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">
                        Lê Thị Ngọc Bích
                      </span>
                      <span
                        className="material-symbols-outlined text-clinical-amber text-sm"
                        title="Điều Dưỡng Trưởng Khối"
                      >
                        verified
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      Điều Dưỡng Trưởng Khối Lão Khoa
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                      {is205Sos ? 'Đang xử lý SOS Phòng 205' : 'Trực đài điều phối'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast(
                      'Bộ Đàm Ưu Tiên',
                      'Đang kết nối bộ đàm tần số 433MHz với ĐD Trưởng Lê Thị Ngọc Bích...'
                    )
                  }
                  className="w-10 h-10 rounded-xl bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary flex items-center justify-center transition-colors shadow-sm border border-surface-container"
                  title="Bộ Đàm Ưu Tiên"
                >
                  <span className="material-symbols-outlined text-lg">call</span>
                </button>
              </div>

              {/* Staff List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 hover:bg-surface-container-low rounded-xl transition-colors border border-surface-container/30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-md text-label-md font-bold">
                      TH
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Trần Hữu Nam
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Phụ trách Villa Sen Vàng (P301-P308)
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-vital-stable/10 text-vital-stable font-label-sm text-label-sm font-bold">
                    Sẵn sàng
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 hover:bg-surface-container-low rounded-xl transition-colors border border-surface-container/30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-md text-label-md font-bold">
                      MA
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Nguyễn Mai Anh
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Phụ trách Sanctuary ICU (P101-P110)
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-vital-stable/10 text-vital-stable font-label-sm text-label-sm font-bold">
                    Sẵn sàng
                  </span>
                </div>
              </div>

              {/* Full Hospital Bell Test Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleTestAllBells}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high hover:bg-primary-container hover:text-on-primary text-on-surface transition-all font-title-sm text-title-sm font-bold flex items-center justify-center gap-2 border border-surface-container"
                >
                  <span className="material-symbols-outlined text-base">campaign</span>
                  <span>Kích Hoạt Kiểm Tra Chuông Toàn Viện</span>
                </button>
                <p className="font-label-sm text-label-sm text-on-surface-variant text-center mt-1.5">
                  Kiểm tra kết nối vô tuyến chuông 52 đầu giường định kỳ 24h.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
