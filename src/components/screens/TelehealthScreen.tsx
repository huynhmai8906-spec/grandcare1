import React, { useState } from 'react';
import { TelehealthAppointment } from '../../types';

interface TelehealthScreenProps {
  appointments: TelehealthAppointment[];
  onOpenDeviceTest: () => void;
  onOpenConsultation: (roomTitle: string) => void;
  onShowToast: (title: string, message: string) => void;
}

export const TelehealthScreen: React.FC<TelehealthScreenProps> = ({
  appointments,
  onOpenDeviceTest,
  onOpenConsultation,
  onShowToast,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(22);
  const [doctorFilter, setDoctorFilter] = useState('');
  const [modalityFilter, setModalityFilter] = useState<'all' | 'direct' | 'tele'>('all');
  const [isSyncingCalendar, setIsSyncingCalendar] = useState(false);

  const days = [
    { day: 'T2', num: 19 },
    { day: 'T3', num: 20 },
    { day: 'T4', num: 21 },
    { day: 'T5', num: 22, isToday: true },
    { day: 'T6', num: 23 },
    { day: 'T7', num: 24 },
    { day: 'CN', num: 25 },
  ];

  const handleGoogleCalendarSync = () => {
    setIsSyncingCalendar(true);
    setTimeout(() => {
      setIsSyncingCalendar(false);
      onShowToast(
        'Đồng Bộ Google Calendar Hoàn Tất',
        'Đã đẩy 18 lịch khám mới nhất vào Google Workspace của hội đồng y khoa.'
      );
    }, 1200);
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesDoctor = !doctorFilter || apt.doctorName.includes(doctorFilter);
    const matchesModality =
      modalityFilter === 'all' ||
      (modalityFilter === 'direct' && apt.type.includes('Trực Tiếp')) ||
      (modalityFilter === 'tele' && apt.type.includes('Telehealth'));

    return matchesDoctor && matchesModality;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Top Command Bar & Clinical Context */}
      <div className="px-6 py-4 bg-surface-clean shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-surface-container/50">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-emerald-deep font-bold bg-primary-fixed/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-deep animate-ping"></span>
              Clinical Scheduling &amp; Telehealth 4.0
            </span>
            <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1 rounded-full text-on-surface border border-surface-container/50">
              <span className="material-symbols-outlined text-[16px] text-vital-stable">
                videocam
              </span>
              <span className="font-label-sm text-label-sm font-semibold">WebRTC 4K AES-256</span>
              <span className="text-vital-stable font-bold font-label-sm text-label-sm">
                • Kết Nối Ổn Định (12ms)
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1 rounded-full text-on-surface border border-surface-container/50">
              <span className="material-symbols-outlined text-[16px] text-clinical-amber">
                verified_user
              </span>
              <span className="font-label-sm text-label-sm font-semibold">
                HIPAA Ready &amp; HL7/FHIR Sync
              </span>
            </div>
          </div>

          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-medium mt-1">
            Lịch Khám Chuyên Khoa &amp; Hội Chẩn Telehealth Trực Tuyến
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Điều phối các ca khám lâm sàng VIP, hội đồng Tele-Grand Round đa chuyên khoa và tích hợp luồng
            khám thời gian thực.
          </p>
        </div>

        {/* Dual Primary CTA Actions */}
        <div className="flex items-center gap-3 flex-wrap shrink-0">
          <button
            onClick={handleGoogleCalendarSync}
            disabled={isSyncingCalendar}
            className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container-lowest text-sapphire-dispatch shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all border border-surface-container"
          >
            {/* Google Calendar SVG Icon */}
            <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="17" rx="3" fill="#ffffff"></rect>
                <path d="M3 8H21V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8Z" fill="#EBF3FE"></path>
                <path d="M3 7C3 5.34315 4.34315 4 6 4H18C19.6569 4 21 5.34315 21 7V9H3V7Z" fill="#1A73E8"></path>
                <rect x="7" y="2" width="2" height="4" rx="1" fill="#174EA6"></rect>
                <rect x="15" y="2" width="2" height="4" rx="1" fill="#174EA6"></rect>
                <rect x="7" y="11" width="3" height="3" rx="0.5" fill="#1A73E8"></rect>
                <rect x="11" y="11" width="3" height="3" rx="0.5" fill="#34A853"></rect>
                <rect x="15" y="11" width="3" height="3" rx="0.5" fill="#FBBC04"></rect>
                <rect x="7" y="15" width="3" height="3" rx="0.5" fill="#EA4335"></rect>
                <rect x="11" y="15" width="3" height="3" rx="0.5" fill="#1A73E8"></rect>
                <rect x="15" y="15" width="3" height="3" rx="0.5" fill="#34A853"></rect>
              </svg>
            </span>
            <div className="flex flex-col text-left">
              <span className="font-label-md text-label-md font-bold text-on-surface leading-tight">
                Đồng Bộ Google Calendar
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px] leading-tight">
                Bác sĩ &amp; Bệnh nhân tự động
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-secondary ml-1 ${
                isSyncingCalendar ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'
              }`}
            >
              sync
            </span>
          </button>

          <button
            onClick={() =>
              onShowToast('Đặt Lịch Mới', 'Mở khung đặt lịch hẹn VIP trực tiếp hoặc Telehealth...')
            }
            className="flex items-center gap-2 bg-emerald-deep text-on-primary px-5 py-2.5 rounded-xl shadow-sm hover:bg-primary transition-all font-title-sm text-title-sm font-semibold"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>Đặt Lịch Khám Mới</span>
          </button>
        </div>
      </div>

      {/* Operational Filter Strip */}
      <div className="px-6 py-3 bg-surface-container-low flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-surface-container/60 shadow-inner">
        {/* Day Selector Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <div className="flex items-center gap-1 bg-surface-clean p-1 rounded-xl shadow-sm mr-2 shrink-0 border border-surface-container">
            <button className="p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="font-title-sm text-title-sm font-bold text-primary px-2">
              Tuần 42 • Tháng 10, 2026
            </span>
            <button className="p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          {days.map((d) => {
            const isSelected = selectedDay === d.num;
            return (
              <button
                key={d.num}
                onClick={() => setSelectedDay(d.num)}
                className={`flex flex-col items-center justify-center min-w-[70px] py-1.5 px-3 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-primary-container text-on-primary shadow-sm ring-2 ring-emerald-deep/20 font-bold'
                    : 'bg-surface-clean hover:bg-surface-container text-on-surface'
                }`}
              >
                <span
                  className={`font-label-sm text-label-sm ${
                    isSelected ? 'text-on-primary-container font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  {d.isToday ? 'Hôm nay' : d.day}
                </span>
                <span className="font-title-md text-title-md font-bold">{d.num}</span>
              </button>
            );
          })}
        </div>

        {/* Doctor & Modality Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Doctor Selector */}
          <div className="relative flex items-center bg-surface-clean rounded-xl px-3 py-1.5 shadow-sm border border-surface-container">
            <span className="material-symbols-outlined text-[18px] text-emerald-deep mr-2">
              clinical_notes
            </span>
            <div className="flex flex-col">
              <label className="font-label-sm text-label-sm text-on-surface-variant leading-none text-[10px]">
                Bác sĩ phụ trách
              </label>
              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="bg-transparent font-title-sm text-title-sm text-on-surface font-semibold focus:outline-none pr-4 cursor-pointer"
              >
                <option value="">Tất Cả Chuyên Gia (4)</option>
                <option value="Quang">PGS.TS Trần Vinh Quang (Tim Mạch)</option>
                <option value="Hùng">TS.BS Lê Hồng Hùng (Điện Sinh Học)</option>
                <option value="Mai">BSCKII Vũ Thị Mai (Thần Kinh & Phục Hồi)</option>
                <option value="Long">ThS.BS Lê Hoàng Long (Can Thiệp Khẩn)</option>
              </select>
            </div>
          </div>

          {/* Modality Filter Segmented Button */}
          <div className="flex items-center bg-surface-clean p-1 rounded-xl shadow-sm border border-surface-container">
            <button
              onClick={() => setModalityFilter('all')}
              className={`px-3 py-1 rounded-lg text-label-md font-label-md transition-colors ${
                modalityFilter === 'all'
                  ? 'bg-surface-container-high text-primary font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setModalityFilter('direct')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-label-md font-label-md transition-colors ${
                modalityFilter === 'direct'
                  ? 'bg-surface-container-high text-primary font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">local_hospital</span>
              <span>Khám Trực Tiếp</span>
            </button>
            <button
              onClick={() => setModalityFilter('tele')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-label-md font-label-md transition-colors ${
                modalityFilter === 'tele'
                  ? 'bg-telehealth-teal text-on-primary font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">videocam</span>
              <span>Telehealth HD</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Workspace Layout */}
      <div className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
        {/* Main Schedule Stream (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Timeline Header Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface-clean p-4 rounded-2xl shadow-sm border border-surface-container/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
                Tổng Lịch Hẹn Hôm Nay
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="font-headline-md text-headline-md text-primary font-bold">18</span>
                <span className="font-label-sm text-label-sm text-vital-stable bg-surface-container px-2 py-0.5 rounded-full font-bold">
                  +4 so với hôm qua
                </span>
              </div>
            </div>

            <div className="bg-surface-clean p-4 rounded-2xl shadow-sm border border-surface-container/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
                Telehealth Video HD
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="font-headline-md text-headline-md text-telehealth-teal font-bold">
                  07
                </span>
                <span className="font-label-sm text-label-sm text-telehealth-teal bg-primary-fixed/30 px-2 py-0.5 rounded-full font-bold">
                  3 ca Quốc Tế
                </span>
              </div>
            </div>

            <div className="bg-surface-clean p-4 rounded-2xl shadow-sm border border-surface-container/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
                Trực Tiếp Tại Phòng VIP
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="font-headline-md text-headline-md text-sapphire-dispatch font-bold">
                  11
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full">
                  Phòng 301-308
                </span>
              </div>
            </div>

            <div className="bg-surface-clean p-4 rounded-2xl shadow-sm border border-surface-container/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
                Hội Chẩn Grand Round
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="font-headline-md text-headline-md text-clinical-amber font-bold">
                  02
                </span>
                <span className="font-label-sm text-label-sm text-error-container text-on-error-container px-2 py-0.5 rounded-full font-bold">
                  14:00 &amp; 16:30
                </span>
              </div>
            </div>
          </div>

          {/* Time-slot Cards */}
          <div className="flex flex-col gap-4">
            {filteredAppointments.map((apt) => {
              const isGrandRound = apt.type === 'Grand Round Telehealth Quốc Tế';
              const isTele = apt.type.includes('Telehealth');

              return (
                <div
                  key={apt.id}
                  className={`relative rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border ${
                    isGrandRound
                      ? 'bg-gradient-to-br from-surface-clean via-tertiary-fixed/10 to-surface-container-low border-clinical-amber/30'
                      : isTele
                      ? 'bg-gradient-to-r from-surface-clean via-primary-fixed/5 to-surface-clean border-telehealth-teal/30'
                      : 'bg-surface-clean border-surface-container/60'
                  }`}
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${
                      isGrandRound
                        ? 'bg-clinical-amber'
                        : isTele
                        ? 'bg-telehealth-teal'
                        : 'bg-emerald-deep'
                    }`}
                  ></div>

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Left Info */}
                    <div className="flex items-start gap-4">
                      {/* Time Block */}
                      <div
                        className={`flex flex-col items-center justify-center px-4 py-2.5 rounded-xl text-center shrink-0 ${
                          isGrandRound
                            ? 'bg-clinical-amber/15 text-tertiary'
                            : isTele
                            ? 'bg-telehealth-teal/10 text-telehealth-teal'
                            : 'bg-surface-container-low text-emerald-deep'
                        }`}
                      >
                        <span className="font-title-md text-title-md font-bold leading-tight">
                          {apt.time}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {apt.duration}
                        </span>
                        <div className="mt-2 flex items-center gap-1">
                          {apt.isActive && (
                            <span className="w-2 h-2 rounded-full bg-vital-stable animate-ping"></span>
                          )}
                          <span className="font-label-sm text-label-sm font-bold uppercase">
                            {apt.statusBadge}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span
                            className={`font-label-sm text-label-sm font-bold px-2.5 py-0.5 rounded-full ${
                              isGrandRound
                                ? 'bg-clinical-amber text-surface-container-lowest'
                                : isTele
                                ? 'bg-telehealth-teal text-on-primary'
                                : 'bg-primary-fixed/40 text-primary'
                            }`}
                          >
                            {apt.type}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded font-mono">
                            {apt.ehrId}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                            {apt.patientName}
                          </h3>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            {apt.patientDetails}
                          </span>
                        </div>

                        <p className="font-body-md text-body-md text-primary font-medium mt-1">
                          {apt.diagnosis}
                        </p>

                        {/* Doctor & Room */}
                        <div className="flex items-center gap-4 mt-3 flex-wrap">
                          <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded-lg border border-surface-container/50">
                            {apt.doctorAvatar && (
                              <img
                                alt={apt.doctorName}
                                className="w-6 h-6 rounded-full object-cover"
                                src={apt.doctorAvatar}
                              />
                            )}
                            <span className="font-title-sm text-title-sm text-on-surface font-bold">
                              {apt.doctorName}
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              {apt.doctorSpecialty}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-on-surface font-title-sm text-title-sm bg-surface-container-high px-3 py-1 rounded-lg">
                            <span className="material-symbols-outlined text-[18px] text-emerald-deep">
                              meeting_room
                            </span>
                            <span>{apt.roomInfo}</span>
                          </div>

                          {apt.ecgSummary && (
                            <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1 rounded-lg shadow-xs border border-surface-container/50">
                              <span className="material-symbols-outlined text-[18px] text-emergency-red animate-pulse">
                                monitor_heart
                              </span>
                              <span className="font-label-md text-label-md text-on-surface font-mono font-bold">
                                {apt.ecgSummary}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Grand Round panel of experts */}
                        {apt.panelExperts && (
                          <div className="mt-3.5 flex flex-col gap-2">
                            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
                              Hội đồng 5 Chuyên Gia Đầu Ngành:
                            </span>
                            <div className="flex items-center gap-2 flex-wrap">
                              {apt.panelExperts.map((exp, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1 rounded-full shadow-2xs border border-surface-container/50 text-xs font-bold text-on-surface"
                                >
                                  <span className="w-2 h-2 rounded-full bg-vital-stable"></span>
                                  <span>{exp}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions right */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-between gap-2 shrink-0">
                      {isTele ? (
                        <>
                          <button
                            onClick={() => onOpenConsultation(apt.patientName)}
                            className="inline-flex items-center justify-center gap-2 bg-telehealth-teal hover:bg-emerald-deep text-on-primary px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all font-title-sm text-title-sm font-bold"
                          >
                            <span className="material-symbols-outlined text-[20px]">video_call</span>
                            <span>Vào Phòng Telehealth Ngay</span>
                          </button>
                          <button
                            onClick={() =>
                              onShowToast('Holter ECG', `Đang kết nối live stream telemetry Holter 24h của ${apt.patientName}.`)
                            }
                            className="inline-flex items-center justify-center gap-1.5 bg-surface-container hover:bg-surface-container-high text-primary px-4 py-2 rounded-lg text-title-sm font-title-sm font-semibold transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px] text-emergency-red">
                              ecg_heart
                            </span>
                            <span>Xem ECG Trực Tiếp</span>
                          </button>
                          <button
                            onClick={() =>
                              onShowToast('SMS Nhắc Hẹn', `Đã gửi tin nhắn SMS kèm link WebRTC tới số điện thoại của ${apt.patientName}.`)
                            }
                            className="inline-flex items-center justify-center gap-1 text-on-surface-variant hover:text-on-surface text-label-md font-label-md py-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              notifications_active
                            </span>
                            <span>Gửi lời nhắc SMS vào phòng</span>
                          </button>
                        </>
                      ) : isGrandRound ? (
                        <>
                          <button
                            onClick={() => onOpenConsultation('VIP Grand Round Telehealth 4K')}
                            className="inline-flex items-center justify-center gap-2 bg-clinical-amber hover:bg-tertiary-container text-surface-container-lowest px-5 py-2.5 rounded-xl shadow-md transition-all font-title-sm text-title-sm font-bold"
                          >
                            <span className="material-symbols-outlined text-[20px]">cast_connected</span>
                            <span>Vào Phòng Họp VIP Grand Round</span>
                          </button>
                          <button
                            onClick={() =>
                              onShowToast('Bệnh Án Ca Khó', 'Đang tải hồ sơ bệnh án đa mô thức DICOM & PACS.')
                            }
                            className="inline-flex items-center justify-center gap-1.5 bg-surface-container hover:bg-surface-container-high text-primary px-4 py-2 rounded-lg text-title-sm font-title-sm font-semibold transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">description</span>
                            <span>Xem Hồ Sơ Bệnh Án Ca Khó</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              onShowToast('Hồ Sơ EHR', `Mở hồ sơ bệnh án khám lâm sàng của ${apt.patientName}.`)
                            }
                            className="bg-surface-container-lowest hover:bg-surface-container px-3 py-2 rounded-lg text-primary text-title-sm font-title-sm shadow-sm flex items-center gap-1 border border-surface-container"
                          >
                            <span className="material-symbols-outlined text-[18px]">folder_shared</span>
                            <span>Mở Hồ Sơ EHR</span>
                          </button>
                          <button
                            onClick={() =>
                              onShowToast('Nhập Kết Quả', `Đang mở biểu mẫu ghi nhận kết quả khám chuyên khoa của ${apt.patientName}.`)
                            }
                            className="bg-emerald-deep hover:bg-primary px-3 py-2 rounded-lg text-on-primary text-title-sm font-title-sm shadow-sm flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit_note</span>
                            <span>Nhập Kết Quả</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar Telehealth Quick Panel (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Virtual Room Panel */}
          <div className="bg-surface-clean rounded-2xl p-6 shadow-sm border border-surface-container/60 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-telehealth-teal text-[24px]">
                  videocam
                </span>
                <div className="flex flex-col">
                  <h2 className="font-title-lg text-title-lg text-primary font-bold">
                    Phòng Họp Ảo Telehealth
                  </h2>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    WebRTC &amp; H.265 Medical Encrypted
                  </span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-vital-stable bg-surface-container px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-vital-stable"></span> Sẵn sàng
              </span>
            </div>

            {/* Room 01 Active Status Card */}
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3 border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="font-title-sm text-title-sm text-on-surface font-bold">
                  Phòng Hội Chẩn Trực Tuyến 01
                </span>
                <span className="font-label-sm text-label-sm font-mono text-emerald-deep font-bold bg-surface-container-lowest px-2 py-0.5 rounded">
                  ID: GC-ROOM-01
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[18px] text-clinical-amber">
                  lock
                </span>
                <span>
                  Mã bảo mật <strong>HIPAA End-to-End Encryption</strong>
                </span>
              </div>

              {/* Hardware Preview Container */}
              <div className="relative w-full h-32 rounded-xl bg-sapphire-dispatch overflow-hidden flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9tqoBrUjaqNJeUde4sFdiqHOazj7r-16wwefZ0l3kK8V71pUyYkwOV2qcf77mq6QfQx70fglP2m8QHHLphwR5IhKB2EQJ-DTYz9Wnb4jlIsI3zIk0rqJd0X9CWDH9aCFa3zu0hWTWvFTuCXdQJYwSZEDyFkVtsFsYsp2hgFnVlD0ErP6P69faYcr2Av6MIjKD94h1lKzVJyGO4OpFP0fLMle2jwaaUCk361kFU1pIQTGkjMMTFgb8')",
                  }}
                ></div>
                <div className="relative z-10 flex flex-col items-center text-center p-3">
                  <span className="w-9 h-9 rounded-full bg-telehealth-teal/90 text-on-primary flex items-center justify-center shadow-md mb-1">
                    <span className="material-symbols-outlined text-[20px]">sensors</span>
                  </span>
                  <span className="font-label-md text-label-md text-on-primary font-bold">
                    Băng thông: 48 Mbps (Quang học Bệnh viện)
                  </span>
                  <span className="font-label-sm text-label-sm text-primary-fixed-dim">
                    Độ trễ tín hiệu: 12ms • 0% Packet Loss
                  </span>
                </div>
              </div>

              {/* Device Diagnostic Checklist */}
              <div className="flex flex-col gap-2 pt-1 font-body-sm text-body-sm">
                <div className="flex items-center justify-between text-on-surface">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-vital-stable">mic</span>
                    Micro Shure Studio Y Khoa:
                  </span>
                  <span className="text-vital-stable font-bold">Hoạt động tốt (100%)</span>
                </div>
                <div className="flex items-center justify-between text-on-surface">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-vital-stable">
                      videocam
                    </span>
                    Sony Medical 4K PTZ Camera:
                  </span>
                  <span className="text-vital-stable font-bold">Sẵn sàng Zoom 30x</span>
                </div>
                <div className="flex items-center justify-between text-on-surface">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-vital-stable">
                      router
                    </span>
                    Đường truyền chuyên dụng 5G Backup:
                  </span>
                  <span className="text-vital-stable font-bold">Kết nối liên tục</span>
                </div>
              </div>

              {/* Device Test Button Trigger */}
              <button
                type="button"
                onClick={onOpenDeviceTest}
                className="mt-1 w-full py-2.5 px-3 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-primary font-title-sm text-title-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 border border-surface-container"
              >
                <span className="material-symbols-outlined text-[18px]">build_circle</span>
                <span>Kiểm Tra Micro / Camera / Băng Thông</span>
              </button>
            </div>
          </div>

          {/* Google Calendar Sync Activity Log */}
          <div className="bg-surface-clean rounded-2xl p-6 shadow-sm border border-surface-container/60 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sapphire-dispatch text-[22px]">
                  sync_alt
                </span>
                <div className="flex flex-col">
                  <h2 className="font-title-lg text-title-lg text-primary font-bold">
                    Lịch Sử Đồng Bộ Google Calendar
                  </h2>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Cập nhật 2 chiều thời gian thực
                  </span>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-vital-stable"></span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-surface-container">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-vital-stable text-on-primary flex items-center justify-center text-xs">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </span>
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  Đồng bộ tự động thành công
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant ml-auto">
                  08:15 Sáng
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface font-medium leading-relaxed">
                Đã tự động gửi thông báo SMS &amp; Calendar Event kèm link Telehealth HD bảo mật cho{' '}
                <strong className="text-primary font-bold">18 bệnh nhân</strong> và{' '}
                <strong className="text-primary font-bold">5 bác sĩ trưởng ca</strong>.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] font-label-sm text-label-sm text-on-surface-variant">
                <span>Webhook: Google Workspace Enterprise</span>
                <span>•</span>
                <span className="text-vital-stable font-bold">Response: 200 OK</span>
              </div>
            </div>

            {/* Micro audit items list */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-2.5 text-on-surface">
                <span className="material-symbols-outlined text-emerald-deep text-[18px] shrink-0 mt-0.5">
                  event_available
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-title-sm text-title-sm text-on-surface font-bold leading-tight">
                    Mời tham dự Grand Round 14:00
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                    Đã xác nhận: 4/5 chuyên gia (Dr. Chen gửi phản hồi chấp nhận)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-on-surface">
                <span className="material-symbols-outlined text-clinical-amber text-[18px] shrink-0 mt-0.5">
                  update
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-title-sm text-title-sm text-on-surface font-bold leading-tight">
                    Dời lịch tái khám ThS.BS Lê Hoàng Long
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                    Bệnh nhân Bùi Đức Hiếu đã đồng bộ lịch mới vào lúc 16:15
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-on-surface">
                <span className="material-symbols-outlined text-sapphire-dispatch text-[18px] shrink-0 mt-0.5">
                  outgoing_mail
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-title-sm text-title-sm text-on-surface font-bold leading-tight">
                    Cập nhật chỉ số tiền sử vào Calendar Memo
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                    Mã hóa an toàn tệp PDF kèm hướng dẫn chuẩn bị trước khám
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onShowToast(
                  'Toàn Bộ Lịch Bệnh Viện',
                  'Đang truy xuất 142 sự kiện lịch trực và hội chẩn trong cơ sở dữ liệu Google Workspace.'
                )
              }
              className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-colors text-center mt-1"
            >
              Xem Tất Cả 142 Sự Kiện Lịch
            </button>
          </div>

          {/* Quick Doctor Roster On-Call */}
          <div className="bg-surface-clean rounded-2xl p-6 shadow-sm border border-surface-container/60 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-title-lg text-title-lg text-primary font-bold">
                Bác Sĩ Trực Ca Sáng Nay
              </h2>
              <span className="font-label-sm text-label-sm font-bold text-vital-stable bg-surface-container px-2.5 py-0.5 rounded-full">
                4 Đang Khám
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xs">
                    VQ
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-bold leading-tight">
                      PGS.TS Trần Vinh Quang
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                      5 Lịch Hẹn (1 Trực tiếp, 4 Tele)
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-vital-stable font-bold bg-vital-stable/10 px-2 py-0.5 rounded">
                  Bận ca
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-telehealth-teal flex items-center justify-center text-on-primary font-bold text-xs">
                    HH
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-bold leading-tight">
                      TS.BS Lê Hồng Hùng
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                      4 Lịch Hẹn Telehealth HD
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-telehealth-teal font-bold bg-primary-fixed/30 px-2 py-0.5 rounded">
                  Sẵn sàng
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-primary font-bold text-xs">
                    VM
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-bold leading-tight">
                      BSCKII Vũ Thị Mai
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                      6 Lịch Hẹn Trị Liệu Thảo Điền
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-vital-stable font-bold bg-vital-stable/10 px-2 py-0.5 rounded">
                  Bận ca
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-clinical-amber flex items-center justify-center text-on-primary font-bold text-xs">
                    HL
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-bold leading-tight">
                      ThS.BS Lê Hoàng Long
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                      3 Lịch Can Thiệp Khẩn
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-emerald-deep font-bold bg-primary-fixed/30 px-2 py-0.5 rounded">
                  Trực Cấp Cứu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
