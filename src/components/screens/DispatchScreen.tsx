import React, { useState, useEffect } from 'react';
import { AmbulanceUnit } from '../../types';

interface DispatchScreenProps {
  fleet: AmbulanceUnit[];
  onShowToast: (title: string, message: string, type?: 'success' | 'alert') => void;
}

export const DispatchScreen: React.FC<DispatchScreenProps> = ({ fleet, onShowToast }) => {
  const [teleHr, setTeleHr] = useState<number>(118);
  const [teleSpo2, setTeleSpo2] = useState<number>(94);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(228); // 3m 48s
  const [ambulanceProgress, setAmbulanceProgress] = useState<number>(72);
  const [isMicOpen, setIsMicOpen] = useState(false);

  // Live countdown timer and telemetry oscillation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));

      // Micro oscillations
      const deltaHr = Math.floor(Math.random() * 5) - 2;
      setTeleHr((prev) => Math.max(112, Math.min(125, prev + deltaHr)));

      if (Math.random() > 0.6) {
        setTeleSpo2((prev) => (prev === 94 ? 95 : 94));
      }
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleRefreshMatrix = () => {
    onShowToast(
      'Cập Nhật Ma Trận Hoàn Tất',
      'Đã tái tính toán 1,480 nút giao thông khu vực Quận 1 & Thủ Thiêm bằng Dijkstra Engine.'
    );
  };

  const handleSendToTablet = () => {
    onShowToast(
      'Đã Gửi Lộ Trình!',
      'Dijkstra Waypoint đã nạp vào Tablet Panasonic Toughbook của BS. Huỳnh Mai.'
    );
  };

  const handleInstantDepart = () => {
    setAmbulanceProgress(85);
    onShowToast(
      'LỆNH XUẤT PHÁT KHẨN CẤP',
      'Đã cấp phép còi ưu tiên & mở luồng xanh giao thông tuyến Mai Chí Thọ.'
    );
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Command Strip */}
      <div className="px-6 pt-5 pb-4 max-w-7xl mx-auto w-full">
        {/* Breadcrumb & Critical Signal Level */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            <span className="inline-flex items-center gap-1 text-primary font-bold">
              <span className="material-symbols-outlined text-sm">emergency</span>
              ĐIỀU HÀNH KHẨN CẤP QUỐC TẾ
            </span>
            <span>/</span>
            <span>VỆ TINH GNSS-RTK</span>
            <span>/</span>
            <span className="text-sapphire-dispatch font-bold">DIJKSTRA ENGINE V4.2</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-1 rounded-full shadow-sm border border-surface-container/60">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vital-stable opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-vital-stable"></span>
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                GNSS Radar: <strong className="text-vital-stable font-bold">100% LOCK (24/24 Sats)</strong>
              </span>
              <span className="text-outline-variant">|</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Độ trễ truyền tin: 14ms
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-xs">traffic</span>
              <span>
                Ưu tiên làn sóng xanh: <strong className="text-primary font-bold">BẬT</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Main Title & Action Buttons */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold flex items-center gap-3">
              <span>Trung Tâm Điều Phối Cấp Cứu 115 &amp; Dijkstra GPS</span>
              <span className="bg-error-container text-on-error-container px-3 py-0.5 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wide">
                CẤP CỨU THỜI GIAN VÀNG
              </span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Tối ưu hóa đa nút giao thông thời gian thực bằng thuật toán Dijkstra vi sai, kết nối trực tiếp phòng ICU di động với Viện Trưởng &amp; Phòng Mổ Cấp Cứu.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRefreshMatrix}
              className="h-11 px-4 rounded-xl bg-surface-container-highest hover:bg-surface-variant text-on-surface font-title-sm text-title-sm font-semibold flex items-center gap-2 transition-colors shadow-sm border border-surface-container"
            >
              <span className="material-symbols-outlined text-sm">cached</span>
              <span>Quét Ma Trận Giao Thông</span>
            </button>
            <button
              onClick={() =>
                onShowToast(
                  'Mở Tiếp Nhận Khẩn 115',
                  'Sẵn sàng điều phối lệnh xuất xe cứu thương mới từ Trung tâm Điều Hành.'
                )
              }
              className="h-11 px-5 rounded-xl bg-emergency-red hover:bg-error text-on-error font-title-sm text-title-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">e911_emergency</span>
              <span>Phát Lệnh Xuất Xe Mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Workstation Grid: Split Panels */}
      <div className="px-6 grid grid-cols-1 xl:grid-cols-12 gap-6 pb-12 max-w-7xl mx-auto w-full">
        {/* LEFT COLUMN (5 cols): Active ICU Fleet & Dijkstra Calculation Matrix */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          {/* Module 1: Active ICU Fleet Status */}
          <div className="bg-surface-clean rounded-2xl p-5 shadow-sm border border-surface-container/60">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-xl">ambulance</span>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Đội Xe Cứu Thương ICU Ngoại Viện
                </h2>
              </div>
              <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold">
                {fleet.length}/3 Đơn Vị Hoạt Động
              </span>
            </div>

            {/* Fleet List */}
            <div className="flex flex-col gap-3">
              {/* Vehicle 1: ICU-02 Sala (Active Transit) */}
              <div className="relative bg-surface-container-lowest rounded-xl p-4 shadow-sm transition-all hover:shadow-md border border-emergency-red/30">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emergency-red animate-ping"></span>
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">
                      ICU-02 Sala
                    </span>
                    <span className="text-body-sm font-body-sm text-on-surface-variant font-medium">
                      Mercedes-Benz Sprinter 319CDI
                    </span>
                  </div>
                  <span className="bg-error-container text-on-error-container font-label-sm text-label-sm font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">near_me</span> ĐANG TIẾP CẬN
                  </span>
                </div>

                {/* Crew details */}
                <div className="grid grid-cols-3 gap-1.5 bg-surface-container-low p-2.5 rounded-lg text-body-sm font-body-sm mb-2.5 border border-surface-container/50">
                  <div>
                    <span className="text-on-surface-variant block font-label-sm text-[10px]">Trưởng Kíp</span>
                    <strong className="text-primary truncate block">BS. Huỳnh Mai</strong>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block font-label-sm text-[10px]">ĐD Hồi Sức</span>
                    <strong className="text-on-surface truncate block">Tuấn Anh</strong>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block font-label-sm text-[10px]">Lái Xe ICU</span>
                    <strong className="text-on-surface truncate block">Hùng (P.08)</strong>
                  </div>
                </div>

                {/* Real-time Progress & ETA */}
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm font-bold text-emergency-red bg-error-container/60 px-2 py-0.5 rounded">
                      ETA 3.8 PHÚT
                    </span>
                    <span className="text-on-surface-variant text-body-sm">
                      Tốc độ: <strong>68 km/h</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-deep font-semibold text-body-sm">
                    <span className="material-symbols-outlined text-sm">wifi_tethering</span>
                    <span>Tele-ICU Đồng Bộ</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-surface-container h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="bg-emergency-red h-full rounded-full transition-all duration-700"
                    style={{ width: `${ambulanceProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Vehicle 2: ICU-04 Thảo Điền */}
              <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm transition-all hover:shadow-md border border-surface-container/60">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-vital-stable"></span>
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">
                      ICU-04 Thảo Điền
                    </span>
                    <span className="text-body-sm font-body-sm text-on-surface-variant font-medium">
                      Ford Transit Mobile ECMO
                    </span>
                  </div>
                  <span className="bg-surface-container-high text-vital-stable font-label-sm text-label-sm font-bold px-2 py-0.5 rounded-full">
                    SẴN SÀNG 100%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 bg-surface-container-low p-2 rounded-lg text-body-sm font-body-sm mb-2 border border-surface-container/50">
                  <div>
                    <span className="text-on-surface-variant block font-label-sm text-[10px]">Trưởng Kíp</span>
                    <strong className="text-primary truncate block">ThS.BS Lê H. Long</strong>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block font-label-sm text-[10px]">ĐD Cấp Cứu</span>
                    <strong className="text-on-surface truncate block">Thu Hà</strong>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block font-label-sm text-[10px]">Lái Xe</span>
                    <strong className="text-on-surface truncate block">Minh (P.02)</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
                  <span>Vị trí: Bãi đỗ Trạm Cấp cứu Thảo Điền</span>
                  <span className="text-vital-stable font-semibold">Áp lực Oxy: 180 Bar</span>
                </div>
              </div>

              {/* Vehicle 3: ICU-01 Bạch Đằng */}
              <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm opacity-90 transition-all hover:opacity-100 border border-surface-container/60">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sapphire-dispatch"></span>
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">
                      ICU-01 Bạch Đằng
                    </span>
                    <span className="text-body-sm font-body-sm text-on-surface-variant font-medium">
                      Mercedes Sprinter High-Roof
                    </span>
                  </div>
                  <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold px-2 py-0.5 rounded-full">
                    CHUYỂN VIỆN TUYẾN TRÊN
                  </span>
                </div>
                <div className="text-body-sm font-body-sm text-on-surface-variant flex items-center justify-between mt-1">
                  <span>Điểm đích: Viện Tim Quốc Gia CS2</span>
                  <span className="font-label-sm text-label-sm font-bold text-sapphire-dispatch">
                    Hoàn thành 45%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Module 2: Dijkstra Shortest Path Engine */}
          <div className="bg-surface-clean rounded-2xl p-5 shadow-sm border border-surface-container/60 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-clinical-amber text-xl">
                  alt_route
                </span>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Thuật Toán Tối Ưu Lộ Trình Dijkstra
                </h2>
              </div>
              <span className="font-label-sm text-label-sm bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant font-mono font-bold">
                O(V log V + E)
              </span>
            </div>

            {/* Waypoints */}
            <div className="bg-surface-container-lowest p-3 rounded-xl flex flex-col gap-2 border border-surface-container/60">
              {/* Point A */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xs shrink-0">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant block">
                    Điểm Xuất Phát (Hub Origin)
                  </span>
                  <p className="font-title-sm text-title-sm text-on-surface truncate font-semibold">
                    Hub Trạm Cấp Cứu Trung Tâm - GrandCare
                  </p>
                </div>
                <span className="font-label-sm text-label-sm text-emerald-deep font-bold bg-primary-fixed px-2 py-0.5 rounded">
                  Trạm Trọng Điểm
                </span>
              </div>

              <div className="flex items-center pl-3.5 py-0.5">
                <div className="h-4 w-0.5 bg-outline-variant"></div>
                <span className="material-symbols-outlined text-outline-variant text-xs -ml-1">
                  keyboard_double_arrow_down
                </span>
              </div>

              {/* Point B */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emergency-red flex items-center justify-center text-on-error font-bold text-xs shrink-0">
                  B
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emergency-red block">
                    Điểm Cấp Cứu Khẩn Cấp (Destination)
                  </span>
                  <p className="font-title-sm text-title-sm text-on-surface truncate font-bold">
                    Villa Sen Vàng Sala, số 42 Đường Mai Chí Thọ
                  </p>
                </div>
                <span className="font-label-sm text-label-sm bg-error-container text-on-error-container px-2 py-0.5 rounded font-bold">
                  Code STEMI
                </span>
              </div>
            </div>

            {/* Dijkstra Real-time Math Output */}
            <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-2 border border-surface-container/50">
              <div className="flex items-center justify-between pb-1">
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wide text-primary">
                  Lộ Trình Tối Ưu Giải Thuật Dijkstra
                </span>
                <span className="text-vital-stable font-label-sm text-label-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">verified</span> Đã Tối Thiểu Hóa
                  Trọng Số
                </span>
              </div>

              {/* Route string */}
              <div className="bg-surface-container-lowest p-2.5 rounded-lg font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-2 flex-wrap border border-surface-container/50">
                <span className="text-primary font-bold">Nút Giao 14</span>
                <span className="material-symbols-outlined text-xs text-clinical-amber">
                  trending_flat
                </span>
                <span className="text-emerald-deep font-bold">Cầu Thủ Thiêm 2</span>
                <span className="material-symbols-outlined text-xs text-clinical-amber">
                  trending_flat
                </span>
                <span className="text-sapphire-dispatch font-bold">Đại Lộ Mai Chí Thọ</span>
              </div>

              <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant pt-1">
                <span className="material-symbols-outlined text-sm text-vital-stable">
                  check_circle
                </span>
                <span>
                  Tự động né điểm ùn tắc nặng tại <strong>Đinh Tiên Hoàng &amp; Tôn Đức Thắng</strong>.
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-container/50">
                  <span className="text-on-surface-variant font-label-sm text-[11px] block">
                    Khoảng Cách Thuật Toán
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline-md text-headline-md font-bold text-primary">
                      4.6
                    </span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      km
                    </span>
                  </div>
                  <span className="text-vital-stable font-label-sm text-[10px] block mt-0.5">
                    Tuyến ngắn nhất đồ thị
                  </span>
                </div>

                <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-container/50">
                  <span className="text-on-surface-variant font-label-sm text-[11px] block">
                    Thời Gian Vàng (ETA)
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline-md text-headline-md font-bold text-emergency-red">
                      4.1
                    </span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      phút
                    </span>
                  </div>
                  <span className="text-vital-stable font-label-sm text-[10px] font-bold block mt-0.5">
                    Nhanh hơn 3.8 phút so với thường
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={handleSendToTablet}
                className="h-11 px-3 rounded-xl bg-surface-container-highest hover:bg-surface-variant text-primary font-title-sm text-title-sm font-bold flex items-center justify-center gap-2 transition-colors border border-surface-container"
              >
                <span className="material-symbols-outlined text-sm">send_to_mobile</span>
                <span>Gửi Tablet Xe ICU-02</span>
              </button>
              <button
                type="button"
                onClick={handleInstantDepart}
                className="h-11 px-3 rounded-xl bg-primary hover:bg-emerald-deep text-on-primary font-title-sm text-title-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">local_shipping</span>
                <span>Chỉ Định Xe Xuất Phát</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (7 cols): Interactive GPS Map with Dijkstra Visual Graph & Telemetry Stream */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          {/* Module 3: GPS Dijkstra Map Canvas */}
          <div className="bg-surface-clean rounded-2xl p-5 shadow-sm border border-surface-container/60 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-deep text-xl">map</span>
                <div>
                  <h2 className="font-title-md text-title-md text-on-surface font-bold">
                    Bản Đồ GPS Điều Hướng Đồ Thị Dijkstra Realtime
                  </h2>
                  <span className="text-body-sm font-body-sm text-on-surface-variant">
                    Lưới giao thông Đô thị Thủ Thiêm &amp; Trung Tâm Quận 1
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-surface-container px-2.5 py-1 rounded-full text-vital-stable font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-vital-stable animate-ping"></span> Live
                  Tracking
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast('Chế Độ Toàn Màn Hình', 'Đang phóng to bản đồ GIS định vị vệ tinh.')
                  }
                  className="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-variant flex items-center justify-center text-on-surface"
                >
                  <span className="material-symbols-outlined text-sm">fullscreen</span>
                </button>
              </div>
            </div>

            {/* The Map Area */}
            <div className="relative w-full h-[410px] bg-slate-900 rounded-xl overflow-hidden shadow-inner select-none">
              {/* Map Background */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity filter contrast-125"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxsZgVjn-L-MQtxpPkrVr0IRLg6oDJsXX9hon0aFRiG6eqANcZQdLsOGaUlZW5aIhcAAgjqbkGB7EVnlZ7GtZM2r785fUKAzEJDtoqswJdI09mbpMs8XShempKDdBmCBh_vHVYfSTSrN5zW9y7jmGtaO-ATfBq4rHsjSrLPloT87oVQ5i1oA39i4eA_biu0iN0pk0a0UjFbgEAtlyUmnqPsGFh9nk6tb4LeMlTe731SKMNFes0tu8X')",
                }}
              ></div>

              {/* Blueprint Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#1B3B5F_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

              {/* SVG Dijkstra Graph Layer */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
                viewBox="0 0 700 410"
              >
                {/* Congested Avoided Route (Dotted Red & Faded) */}
                <path
                  d="M 120 310 Q 180 240, 260 250 T 420 220 T 590 140"
                  fill="none"
                  stroke="#BA1A1A"
                  strokeDasharray="6,6"
                  strokeOpacity="0.45"
                  strokeWidth="3"
                />
                <text x="270" y="275" fill="#BA1A1A" fontSize="11" fontWeight="700" opacity="0.8">
                  Ùn tắc Đinh Tiên Hoàng (+11.2 min)
                </text>

                {/* Dijkstra Optimal Shortest Path */}
                <path
                  d="M 120 310 L 210 210 L 370 170 L 590 140"
                  fill="none"
                  opacity="0.3"
                  stroke="#0D5C58"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="9"
                />
                <path
                  d="M 120 310 L 210 210 L 370 170 L 590 140"
                  fill="none"
                  stroke="#216964"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                />
                <path
                  d="M 120 310 L 210 210 L 370 170 L 590 140"
                  fill="none"
                  stroke="#C5A059"
                  strokeDasharray="12,18"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  className="animate-pulse"
                />

                {/* Nodes */}
                <circle cx="120" cy="310" r="10" fill="#004340" />
                <circle cx="120" cy="310" r="5" fill="#8fd3cd" />
                <circle cx="210" cy="210" r="6" fill="#C5A059" />
                <circle cx="370" cy="170" r="7" fill="#147A74" />
                <circle
                  cx="370"
                  cy="170"
                  r="12"
                  fill="none"
                  stroke="#147A74"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  className="animate-ping"
                />
                <circle cx="590" cy="140" r="12" fill="#BA1A1A" />
                <circle cx="590" cy="140" r="6" fill="#FFFFFF" />
              </svg>

              {/* Origin Tag */}
              <div className="absolute left-[80px] top-[325px] bg-primary text-on-primary px-2.5 py-1 rounded-md text-[11px] font-bold shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-vital-stable"></span>
                <span>Trạm Hub GrandCare (Origin)</span>
              </div>

              {/* Moving Ambulance Marker */}
              <div className="absolute left-[340px] top-[148px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20">
                <div className="bg-emergency-red text-on-error px-2.5 py-1 rounded-full text-xs font-bold shadow-xl flex items-center gap-1.5 border-2 border-white animate-bounce">
                  <span className="material-symbols-outlined text-xs">ambulance</span>
                  <span>ICU-02 (68 km/h)</span>
                </div>
                <div className="w-3 h-3 bg-emergency-red rotate-45 -mt-1.5 shadow-md"></div>
              </div>

              {/* Priority Traffic Light */}
              <div className="absolute left-[200px] top-[170px] bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-vital-stable/40 text-[10px] font-mono text-vital-stable flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-vital-stable animate-pulse">
                  traffic
                </span>
                <span>ĐÈN ƯU TIÊN XANH: 45s</span>
              </div>

              {/* Destination Tag */}
              <div className="absolute right-[45px] top-[105px] bg-emergency-red text-on-error px-2.5 py-1 rounded-md text-xs font-bold shadow-md flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">location_on</span>
                <span>Villa Sen Vàng Sala (Code STEMI)</span>
              </div>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-3 left-3 bg-surface-clean/95 backdrop-blur-md p-2.5 rounded-xl shadow-md flex items-center gap-4 text-[11px] font-medium text-on-surface border border-surface-container">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-emerald-deep rounded-full"></span>
                  <span>Tuyến Dijkstra tối ưu (4.1 min)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-emergency-red/60 border-b border-dashed border-emergency-red"></span>
                  <span>Tuyến né kẹt xe</span>
                </div>
                <div className="flex items-center gap-1.5 text-vital-stable font-bold">
                  <span className="material-symbols-outlined text-xs">rss_feed</span>
                  <span>Vệ Tinh GPS RTK 2cm</span>
                </div>
              </div>

              {/* Map Layer Zoom Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => onShowToast('Zoom In', 'Phóng to bản đồ 150%')}
                  className="w-7 h-7 rounded-lg bg-surface-clean/90 hover:bg-surface-clean text-primary flex items-center justify-center shadow font-bold text-xs"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Zoom Out', 'Thu nhỏ bản đồ 75%')}
                  className="w-7 h-7 rounded-lg bg-surface-clean/90 hover:bg-surface-clean text-primary flex items-center justify-center shadow font-bold text-xs"
                >
                  -
                </button>
              </div>
            </div>

            {/* GPS Telemetry Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
              <div className="bg-surface-container-low p-2.5 rounded-xl flex flex-col border border-surface-container/50">
                <span className="text-on-surface-variant font-label-sm text-[10px]">
                  Tọa Độ GPS Hiện Tại
                </span>
                <span className="font-mono text-body-sm font-bold text-on-surface">
                  10.7719° N, 106.7198° E
                </span>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded-xl flex flex-col border border-surface-container/50">
                <span className="text-on-surface-variant font-label-sm text-[10px]">
                  Trọng Số Đồ Thị Cost
                </span>
                <span className="font-mono text-body-sm font-bold text-primary">
                  w = 0.42 (Tối Thiểu)
                </span>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded-xl flex flex-col border border-surface-container/50">
                <span className="text-on-surface-variant font-label-sm text-[10px]">
                  Làn Khẩn Cấp Mở Rộng
                </span>
                <span className="text-body-sm font-bold text-vital-stable flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">scale</span> 100% Thông Suốt
                </span>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded-xl flex flex-col border border-surface-container/50">
                <span className="text-on-surface-variant font-label-sm text-[10px]">
                  Thời Gian Tiếp Cận
                </span>
                <span className="font-mono text-body-sm font-bold text-emergency-red">
                  {formatCountdown(countdownSeconds)} Đếm Lùi
                </span>
              </div>
            </div>
          </div>

          {/* Module 4: Mobile Telemetry Stream */}
          <div className="bg-surface-clean rounded-2xl p-5 shadow-sm border border-surface-container/60 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-emergency-red text-xl animate-pulse">
                  monitor_heart
                </span>
                <div>
                  <h2 className="font-title-md text-title-md text-on-surface font-bold">
                    Giám Sát Sinh Hiệu Tele-ICU Trực Tiếp (Xe ICU-02)
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Bệnh nhân: Ông Trần V. T. (64 tuổi) - Chẩn đoán sơ bộ: Nhồi Máu Cơ Tim Cấp ST Chênh Lên
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm bg-primary text-on-primary px-3 py-1 rounded-full font-bold">
                  KÊNH HL7 / FHIR TRỰC TIẾP
                </span>
              </div>
            </div>

            {/* Telemetry Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Vital 1: HR */}
              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col justify-between border border-surface-container/50">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold text-emergency-red flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">favorite</span> NHỊP TIM (HR)
                  </span>
                  <span className="text-[10px] text-on-surface-variant uppercase">bpm</span>
                </div>
                <div className="my-1 flex items-baseline gap-1.5">
                  <span className="font-headline-lg text-headline-lg font-bold text-emergency-red">
                    {teleHr}
                  </span>
                  <span className="font-label-sm text-label-sm text-emergency-red font-semibold">
                    Tachycardia
                  </span>
                </div>
                <svg className="w-full h-7 text-emergency-red" fill="none" viewBox="0 0 100 28">
                  <path
                    d="M 0 14 L 20 14 L 25 3 L 30 25 L 35 14 L 45 14 L 50 2 L 55 26 L 60 14 L 75 14 L 80 5 L 85 23 L 90 14 L 100 14"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>

              {/* Vital 2: SpO2 */}
              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col justify-between border border-surface-container/50">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold text-telehealth-teal flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">air</span> SpO2 OXY
                  </span>
                  <span className="text-[10px] text-on-surface-variant uppercase">%</span>
                </div>
                <div className="my-1 flex items-baseline gap-1.5">
                  <span className="font-headline-lg text-headline-lg font-bold text-telehealth-teal">
                    {teleSpo2}
                  </span>
                  <span className="font-label-sm text-label-sm text-clinical-amber font-semibold">
                    Oxy Mask 6L
                  </span>
                </div>
                <svg className="w-full h-7 text-telehealth-teal" fill="none" viewBox="0 0 100 28">
                  <path
                    d="M 0 20 Q 15 5, 25 10 T 50 20 T 75 10 T 100 20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>

              {/* Vital 3: NIBP */}
              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col justify-between border border-surface-container/50">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold text-sapphire-dispatch flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">speed</span> HUYẾT ÁP NIBP
                  </span>
                  <span className="text-[10px] text-on-surface-variant uppercase">mmHg</span>
                </div>
                <div className="my-1 flex items-baseline gap-1.5">
                  <span className="font-headline-lg text-headline-lg font-bold text-sapphire-dispatch">
                    85/55
                  </span>
                  <span className="font-label-sm text-label-sm text-emergency-red font-semibold">
                    Hạ HA
                  </span>
                </div>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-1">
                  MAP: 65 mmHg | Bơm Dopamine
                </span>
              </div>

              {/* Vital 4: 12-Lead ECG */}
              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col justify-between border border-surface-container/50">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold text-clinical-amber flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">electric_bolt</span> ECG 12-CHUYỂN ĐẠO
                  </span>
                  <span className="text-vital-stable font-bold text-[10px]">Zoll X Ready</span>
                </div>
                <div className="my-1">
                  <span className="font-title-sm text-title-sm font-bold text-emergency-red block">
                    ST Chênh V1-V4
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Sẵn sàng phòng Cathlab #01
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-vital-stable font-bold">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  <span>Đã truyền Aspirin 300mg</span>
                </div>
              </div>
            </div>

            {/* Tele-consult Hotline Strip */}
            <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 border border-surface-container/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emergency-red text-on-error flex items-center justify-center font-bold text-xs shrink-0">
                  <span className="material-symbols-outlined text-base">video_camera_front</span>
                </div>
                <div>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">
                    Kênh Tele-ICU Kíp Xe ICU-02 &amp; Trưởng Khoa Tim Mạch Can Thiệp
                  </span>
                  <span className="text-body-sm font-body-sm text-on-surface-variant block">
                    Đang kết nối liên tục với GS. Đặng Hoàng Minh qua camera HD nội thất xe
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMicOpen(!isMicOpen);
                    onShowToast(
                      isMicOpen ? 'Tắt Mic' : 'Mở Mic Thành Công',
                      isMicOpen
                        ? 'Đã ngắt micro với buồng xe cứu thương.'
                        : 'Micro kết nối 2 chiều với kíp xe ICU-02 đang mở.'
                    );
                  }}
                  className={`px-3.5 py-2 rounded-xl text-title-sm font-title-sm font-semibold flex items-center gap-1.5 transition-colors border ${
                    isMicOpen
                      ? 'bg-emergency-red text-white border-emergency-red'
                      : 'bg-surface-container-lowest hover:bg-surface-variant text-on-surface border-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {isMicOpen ? 'mic_off' : 'mic'}
                  </span>
                  <span>{isMicOpen ? 'Tắt Mic' : 'Mở Mic'}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast(
                      'Kích Hoạt Ekip Cathlab #01',
                      'Đã thông báo khẩn tới phòng can thiệp tim mạch. Kíp trực sẵn sàng tiếp nhận bệnh nhân.'
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-emerald-deep text-on-primary font-title-sm text-title-sm font-bold flex items-center gap-1.5 shadow"
                >
                  <span className="material-symbols-outlined text-sm">meeting_room</span>
                  <span>Kích Hoạt Ekip Can Thiệp CathLab</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
