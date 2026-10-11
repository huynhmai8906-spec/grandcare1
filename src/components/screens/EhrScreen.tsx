import React, { useState, useEffect } from 'react';
import { PatientRecord } from '../../types';

interface EhrScreenProps {
  patients: PatientRecord[];
  selectedPatientId: string;
  onSelectPatient: (id: string) => void;
  onOpenAddModal: () => void;
  onOpenFhirModal: (patient: PatientRecord) => void;
  onExportPdf: (patient: PatientRecord) => void;
}

export const EhrScreen: React.FC<EhrScreenProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
  onOpenAddModal,
  onOpenFhirModal,
  onExportPdf,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'stable' | 'watch' | 'rehab'>('all');
  const [wingFilter, setWingFilter] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);

  // Live vitals fluctuation for active patient
  const [liveHr, setLiveHr] = useState<number>(78);
  const [liveSpo2, setLiveSpo2] = useState<number>(98.5);

  const selectedPatient =
    patients.find((p) => p.id === selectedPatientId) || patients[0] || null;

  useEffect(() => {
    if (selectedPatient) {
      setLiveHr(selectedPatient.hr);
      setLiveSpo2(selectedPatient.spo2);
    }
  }, [selectedPatientId, selectedPatient]);

  // Subtle real-time heartbeat oscillation
  useEffect(() => {
    if (!isStreaming || !selectedPatient) return;
    const interval = setInterval(() => {
      const deltaHr = Math.floor(Math.random() * 5) - 2;
      setLiveHr((prev) => Math.max(55, Math.min(135, selectedPatient.hr + deltaHr)));

      const deltaSpo2 = (Math.random() * 0.4 - 0.2).toFixed(1);
      setLiveSpo2((prev) =>
        Math.min(100, Math.max(90, Number((selectedPatient.spo2 + Number(deltaSpo2)).toFixed(1))))
      );
    }, 2400);

    return () => clearInterval(interval);
  }, [isStreaming, selectedPatient]);

  // Filtered patients
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.cccd.includes(searchQuery);

    const matchesCategory =
      filterCategory === 'all' ||
      (filterCategory === 'stable' && patient.statusCategory === 'stable') ||
      (filterCategory === 'watch' && patient.statusCategory === 'watch') ||
      (filterCategory === 'rehab' && patient.statusCategory === 'rehab');

    const matchesWing = !wingFilter || patient.wing === wingFilter;
    const matchesDoctor = !doctorFilter || patient.doctor.includes(doctorFilter);

    return matchesSearch && matchesCategory && matchesWing && matchesDoctor;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Top Command Ribbon */}
      <div className="px-6 py-4 bg-surface-clean shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-surface-container/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[28px]">clinical_notes</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-emerald-deep font-bold">
                HL7 FHIR R4 Enterprise Clinical Suite
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-vital-stable animate-ping"></span>
                Sync Active (Port 8443)
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary leading-tight font-bold">
              Quản Lý Bệnh Nhân &amp; Hồ Sơ EHR Master
            </h1>
          </div>
        </div>

        {/* Quick Vital Strip & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-xl border border-surface-container/50">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Tổng nội trú VIP</span>
              <span className="font-title-sm text-title-sm font-bold text-primary">48 / 52 Phòng</span>
            </div>
            <div className="h-6 w-px bg-outline-variant"></div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Cảnh báo nhịp tim</span>
              <span className="font-title-sm text-title-sm font-bold text-emergency-red">
                02 Ca cần lưu ý
              </span>
            </div>
          </div>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 bg-emerald-deep text-on-primary px-4 py-2.5 rounded-lg shadow-sm hover:bg-primary transition-all font-title-sm text-title-sm font-semibold"
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>Tiếp Nhận Bệnh Nhân Mới</span>
          </button>

          <button
            onClick={() => selectedPatient && onOpenFhirModal(selectedPatient)}
            className="flex items-center gap-2 bg-surface-container-high text-on-surface px-4 py-2.5 rounded-lg hover:bg-surface-container-highest transition-all font-title-sm text-title-sm font-semibold"
          >
            <span className="material-symbols-outlined text-[20px] text-sapphire-dispatch">
              data_object
            </span>
            <span>FHIR R4 Bundle</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Column Clinical Workspace */}
      <div className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
        {/* LEFT COLUMN: Patient Roster & Filter Matrix (7 Cols) */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          {/* Search & Filter Panel */}
          <div className="bg-surface-clean rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên, mã EHR, CCCD, phòng..."
                  className="w-full pl-10 pr-4 py-2 text-on-surface bg-surface-container-low rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-body-md font-body-md"
                />
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-3 py-1.5 rounded-full text-label-md font-label-md transition-colors ${
                    filterCategory === 'all'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Tất cả ({patients.length})
                </button>
                <button
                  onClick={() => setFilterCategory('stable')}
                  className={`px-3 py-1.5 rounded-full text-label-md font-label-md transition-colors ${
                    filterCategory === 'stable'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Ổn định
                </button>
                <button
                  onClick={() => setFilterCategory('watch')}
                  className={`px-3 py-1.5 rounded-full text-label-md font-label-md transition-colors ${
                    filterCategory === 'watch'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Theo dõi tim
                </button>
                <button
                  onClick={() => setFilterCategory('rehab')}
                  className={`px-3 py-1.5 rounded-full text-label-md font-label-md transition-colors ${
                    filterCategory === 'rehab'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Hậu tai biến
                </button>
              </div>
            </div>

            {/* Dropdown selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-body-sm font-body-sm">
              <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container">
                <span className="material-symbols-outlined text-[18px] text-sapphire-dispatch">
                  apartment
                </span>
                <select
                  value={wingFilter}
                  onChange={(e) => setWingFilter(e.target.value)}
                  className="bg-transparent w-full focus:outline-none text-on-surface"
                >
                  <option value="">Khu nghỉ dưỡng (Tất cả)</option>
                  <option value="sala">Villa Sen Vàng Sala</option>
                  <option value="bachdang">Premier Bạch Đằng</option>
                  <option value="thaodien">Sanctuary Thảo Điền</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container">
                <span className="material-symbols-outlined text-[18px] text-emerald-deep">
                  stethoscope
                </span>
                <select
                  value={doctorFilter}
                  onChange={(e) => setDoctorFilter(e.target.value)}
                  className="bg-transparent w-full focus:outline-none text-on-surface"
                >
                  <option value="">Bác sĩ phụ trách (Tất cả)</option>
                  <option value="Quang">PGS.TS Trần Vinh Quang</option>
                  <option value="Hùng">TS.BS Lê Hồng Hùng</option>
                  <option value="Mai">BSCKII Vũ Thị Mai</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container">
                <span className="material-symbols-outlined text-[18px] text-clinical-amber">tune</span>
                <span className="text-on-surface-variant">Sắp xếp:</span>
                <select className="bg-transparent w-full focus:outline-none text-on-surface font-semibold">
                  <option>Chỉ số cảnh báo</option>
                  <option>Mã EHR giảm dần</option>
                  <option>Phòng A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Patient Cards Stream */}
          <div className="flex flex-col gap-4">
            {filteredPatients.map((patient) => {
              const isSelected = patient.id === selectedPatient?.id;
              const isAlert = patient.statusCategory === 'watch';

              return (
                <div
                  key={patient.id}
                  onClick={() => onSelectPatient(patient.id)}
                  className={`bg-surface-clean rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden border ${
                    isSelected
                      ? 'border-emerald-deep ring-2 ring-emerald-deep/40 bg-surface-container-low/40'
                      : 'border-surface-container/70'
                  }`}
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                      isAlert
                        ? 'bg-clinical-amber'
                        : patient.statusCategory === 'rehab'
                        ? 'bg-sapphire-dispatch'
                        : 'bg-vital-stable'
                    }`}
                  ></div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pl-2">
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <img
                          alt={patient.name}
                          className="w-14 h-14 rounded-xl object-cover shadow-inner"
                          src={patient.avatar}
                        />
                        <span
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-on-primary text-[10px] ${
                            isAlert
                              ? 'bg-clinical-amber animate-pulse'
                              : 'bg-vital-stable'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[12px]">
                            {isAlert ? 'crisis_alert' : 'check'}
                          </span>
                        </span>
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="font-title-lg text-title-lg text-primary font-bold">
                            {patient.name}
                          </h2>
                          <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold tracking-wider">
                            {patient.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${
                              isAlert
                                ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                                : 'bg-surface-container text-vital-stable'
                            }`}
                          >
                            {patient.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mt-1 text-on-surface-variant font-body-sm text-body-sm">
                          <span>{patient.age} tuổi ({new Date(patient.dob).getFullYear()})</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-sapphire-dispatch">
                              hotel
                            </span>
                            {patient.room}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-label-md text-label-md text-on-surface">
                          <span className="material-symbols-outlined text-[16px] text-emerald-deep">
                            health_and_safety
                          </span>
                          <span>
                            BS phụ trách: <strong className="text-primary">{patient.doctor}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mini Vitals Box */}
                    <div className="flex md:flex-col items-end justify-between md:justify-center gap-1 bg-surface-container-low p-2.5 rounded-xl min-w-[150px] border border-surface-container/50 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                          HR
                        </span>
                        <span
                          className={`font-title-sm text-title-sm font-bold ${
                            isAlert ? 'text-emergency-red' : 'text-vital-stable'
                          }`}
                        >
                          {isSelected ? liveHr : patient.hr} bpm
                        </span>
                        <span
                          className={`material-symbols-outlined text-[16px] ${
                            isAlert ? 'text-emergency-red animate-pulse' : 'text-vital-stable'
                          }`}
                        >
                          {isAlert ? 'crisis_alert' : 'show_chart'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                          BP
                        </span>
                        <span className="font-title-sm text-title-sm font-bold text-on-surface">
                          {patient.bp}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                          SpO2
                        </span>
                        <span className="font-title-sm text-title-sm font-bold text-emerald-deep">
                          {isSelected ? liveSpo2 : patient.spo2}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* HL7 v2.5.1 / FHIR R4 Event Stream */}
          <div className="bg-surface-clean rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-deep">sync_saved_locally</span>
                <h3 className="font-title-md text-title-md text-primary font-bold">
                  HL7 v2.5.1 / FHIR R4 Event Stream
                </h3>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Cập nhật mỗi 30s
              </span>
            </div>

            <div className="space-y-2 font-body-sm text-body-sm">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low border border-surface-container/50">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-[11px] font-bold">
                    OBX|1|NM
                  </span>
                  <span className="text-on-surface">
                    EHR-2026-0891: Vitals sync hoàn tất qua Telemetry Hub GW-Sala-3
                  </span>
                </div>
                <span className="font-mono text-on-surface-variant text-[11px]">10:42:15</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low border border-surface-container/50">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-mono text-[11px] font-bold">
                    ALM|2|WARN
                  </span>
                  <span className="text-on-surface">
                    EHR-2026-1044: Rung nhĩ dạng nhẹ (Sinus Tachycardia alert) gửi tới TS. Lê Hồng Hùng
                  </span>
                </div>
                <span className="font-mono text-on-surface-variant text-[11px]">10:41:02</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Telemetry Streamer & Vitals Stage (5 Cols) */}
        {selectedPatient && (
          <div className="xl:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-clean rounded-2xl p-5 shadow-sm border border-surface-container/60 flex flex-col gap-4">
              {/* Streamer Header */}
              <div className="flex items-center justify-between border-b pb-3 border-surface-container">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-low">
                    <span
                      className={`w-3 h-3 rounded-full bg-vital-stable ${
                        isStreaming ? 'animate-ping' : ''
                      }`}
                    ></span>
                    <span className="absolute w-2 h-2 rounded-full bg-vital-stable"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-title-sm text-title-sm font-bold text-primary">
                        Live Pulse Telemetry
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${
                          isStreaming
                            ? 'bg-vital-stable/10 text-vital-stable'
                            : 'bg-outline-variant text-on-surface-variant'
                        }`}
                      >
                        {isStreaming ? 'LIVE STREAM ACTIVE' : 'PAUSED'}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Bệnh nhân: {selectedPatient.name} ({selectedPatient.id})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsStreaming(!isStreaming)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest transition-colors font-label-md text-label-md text-on-surface font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px] text-vital-stable">
                    {isStreaming ? 'sensors' : 'play_arrow'}
                  </span>
                  <span>{isStreaming ? 'Tạm dừng' : 'Tiếp tục'}</span>
                </button>
              </div>

              {/* Real-time ECG Waveform Display Canvas */}
              <div className="relative bg-inverse-surface rounded-xl p-4 text-inverse-on-surface overflow-hidden shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-primary-fixed-dim uppercase tracking-wider font-bold">
                      Lead II • 25mm/s • 10mm/mV
                    </span>
                    <span className="text-[10px] text-outline-variant font-mono">50Hz Filter ON</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-vital-stable animate-pulse"></span>
                    <span className="font-mono text-[11px] text-vital-stable font-bold">
                      ECG REALTIME
                    </span>
                  </div>
                </div>

                {/* Animated ECG Waveform */}
                <div className="w-full h-24 overflow-hidden relative">
                  <svg
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 600 100"
                  >
                    <defs>
                      <linearGradient id="ecgGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" stopColor="#0D5C58" stopOpacity="0.2" />
                        <stop offset="70%" stopColor="#2E6B47" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#abefe9" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    {/* Grid Background Lines */}
                    <path
                      d="M 0 20 L 600 20 M 0 40 L 600 40 M 0 60 L 600 60 M 0 80 L 600 80"
                      fill="none"
                      stroke="#3f4947"
                      strokeDasharray="3,3"
                      strokeWidth="0.3"
                    />
                    {/* ECG Path with Animated Flow */}
                    <path
                      d="M 0 50 Q 20 50 30 50 T 40 45 T 50 50 T 60 55 T 70 50 L 80 50 L 85 20 L 92 88 L 100 45 L 108 52 L 120 50 Q 140 50 160 50 T 170 45 T 180 50 T 190 55 T 200 50 L 210 50 L 215 20 L 222 88 L 230 45 L 238 52 L 250 50 Q 270 50 290 50 T 300 45 T 310 50 T 320 55 T 330 50 L 340 50 L 345 20 L 352 88 L 360 45 L 368 52 L 380 50 Q 400 50 420 50 T 430 45 T 440 50 T 450 55 T 460 50 L 470 50 L 475 20 L 482 88 L 490 45 L 498 52 L 510 50 Q 530 50 550 50 T 560 45 T 570 50 T 580 55 T 590 50 L 600 50"
                      fill="none"
                      stroke="url(#ecgGrad)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    />
                  </svg>
                  <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-inverse-surface pointer-events-none right-0"></div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-outline-variant mt-1">
                  <span>ST Segment: Normal (+0.04mV)</span>
                  <span>PR Interval: 142ms</span>
                  <span>QTC: 412ms</span>
                </div>
              </div>

              {/* 4 Essential Clinical Vital Indicators */}
              <div className="grid grid-cols-2 gap-3">
                {/* Vital 1: Heart Rate */}
                <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col justify-between border border-surface-container">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <span className="flex items-center gap-1 font-bold">
                      <span className="material-symbols-outlined text-emergency-red text-[16px]">
                        favorite
                      </span>{' '}
                      NHỊP TIM (HR)
                    </span>
                    <span className="text-vital-stable font-bold">Sinus Rhythm</span>
                  </div>
                  <div className="flex items-baseline gap-2 my-1">
                    <span className="font-headline-lg text-headline-lg font-bold text-primary">
                      {liveHr}
                    </span>
                    <span className="font-title-sm text-title-sm text-on-surface-variant">bpm</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-deep h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (liveHr / 120) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Vital 2: Blood Pressure */}
                <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col justify-between border border-surface-container">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <span className="flex items-center gap-1 font-bold">
                      <span className="material-symbols-outlined text-sapphire-dispatch text-[16px]">
                        speed
                      </span>{' '}
                      HUYẾT ÁP (NIBP)
                    </span>
                    <span className="text-vital-stable font-bold">Tối ưu</span>
                  </div>
                  <div className="flex items-baseline gap-2 my-1">
                    <span className="font-headline-lg text-headline-lg font-bold text-primary">
                      {selectedPatient.bp}
                    </span>
                    <span className="font-title-sm text-title-sm text-on-surface-variant">mmHg</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-sapphire-dispatch h-full rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                {/* Vital 3: SpO2 */}
                <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col justify-between border border-surface-container">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <span className="flex items-center gap-1 font-bold">
                      <span className="material-symbols-outlined text-telehealth-teal text-[16px]">
                        air
                      </span>{' '}
                      NỒNG ĐỘ SpO2
                    </span>
                    <span className="text-vital-stable font-bold">Khí phòng</span>
                  </div>
                  <div className="flex items-baseline gap-2 my-1">
                    <span className="font-headline-lg text-headline-lg font-bold text-primary">
                      {liveSpo2}
                    </span>
                    <span className="font-title-sm text-title-sm text-on-surface-variant">%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-vital-stable h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, liveSpo2)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Vital 4: Blood Glucose */}
                <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col justify-between border border-surface-container">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <span className="flex items-center gap-1 font-bold">
                      <span className="material-symbols-outlined text-clinical-amber text-[16px]">
                        water_drop
                      </span>{' '}
                      ĐƯỜNG HUYẾT
                    </span>
                    <span className="text-on-surface-variant font-bold">Sau ăn 2h</span>
                  </div>
                  <div className="flex items-baseline gap-2 my-1">
                    <span className="font-headline-lg text-headline-lg font-bold text-primary">
                      {selectedPatient.glucose}
                    </span>
                    <span className="font-title-sm text-title-sm text-on-surface-variant">mmol/L</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-clinical-amber h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

              {/* Quick Patient Summary & Actions */}
              <div className="bg-surface-container-lowest p-4 rounded-xl flex flex-col gap-2.5 shadow-sm border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-title-sm text-title-sm text-primary font-bold">
                    Hồ sơ lâm sàng đang mở
                  </span>
                  <span className="font-mono text-label-sm text-label-sm text-on-surface-variant">
                    {selectedPatient.id}
                  </span>
                </div>
                <div className="text-body-sm font-body-sm text-on-surface space-y-1 leading-relaxed">
                  <p>
                    <strong>Tiền sử:</strong> {selectedPatient.history}
                  </p>
                  <p>
                    <strong>Chỉ định:</strong> {selectedPatient.regime}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-container">
                  <button
                    onClick={() => onOpenFhirModal(selectedPatient)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-sm text-title-sm font-semibold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-sapphire-dispatch">
                      code
                    </span>
                    <span>Xem FHIR JSON</span>
                  </button>
                  <button
                    onClick={() => onExportPdf(selectedPatient)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-title-sm text-title-sm font-semibold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    <span>Xuất PDF Bệnh Án</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Compliance Stamp */}
            <div className="bg-surface-container-low p-4 rounded-2xl flex items-center justify-between border border-surface-container/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm font-bold text-primary">
                    HL7® FHIR® R4 Validated
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Profile: GrandCare Geriatric Clinical Spec 2026
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-vital-stable text-[24px]">
                check_circle
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
