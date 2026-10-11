import React, { useState } from 'react';
import {
  NavTab,
  PatientRecord,
  Prescription,
  DoctorProfile,
  RoomData,
  TelehealthAppointment,
  AmbulanceUnit,
  ApiLogEntry,
} from './types';
import {
  INITIAL_PATIENTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_DOCTORS,
  INITIAL_ROOMS,
  INITIAL_APPOINTMENTS,
  INITIAL_FLEET,
  INITIAL_API_LOGS,
} from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Toast, ToastMessage } from './components/common/Toast';
import { AddPatientModal } from './components/modals/AddPatientModal';
import { FhirViewerModal } from './components/modals/FhirViewerModal';
import { DeviceTestModal } from './components/modals/DeviceTestModal';
import { SosAlertModal } from './components/modals/SosAlertModal';

// Screens
import { DashboardScreen } from './components/screens/DashboardScreen';
import { EhrScreen } from './components/screens/EhrScreen';
import { PharmacyScreen } from './components/screens/PharmacyScreen';
import { DoctorsScreen } from './components/screens/DoctorsScreen';
import { TelehealthScreen } from './components/screens/TelehealthScreen';
import { RoomsScreen } from './components/screens/RoomsScreen';
import { DispatchScreen } from './components/screens/DispatchScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Application Data States
  const [patients, setPatients] = useState<PatientRecord[]>(INITIAL_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(INITIAL_PATIENTS[0].id);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);
  const [apiLogs, setApiLogs] = useState<ApiLogEntry[]>(INITIAL_API_LOGS);
  const [doctors, setDoctors] = useState<DoctorProfile[]>(INITIAL_DOCTORS);
  const [rooms, setRooms] = useState<RoomData[]>(INITIAL_ROOMS);
  const [appointments, setAppointments] = useState<TelehealthAppointment[]>(INITIAL_APPOINTMENTS);
  const [fleet] = useState<AmbulanceUnit[]>(INITIAL_FLEET);

  // Modals state
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isFhirModalOpen, setIsFhirModalOpen] = useState(false);
  const [fhirPatient, setFhirPatient] = useState<PatientRecord | null>(null);
  const [isDeviceTestOpen, setIsDeviceTestOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [activeVideoCall, setActiveVideoCall] = useState<{ roomTitle: string; doctorName?: string } | null>(null);

  // Toast state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'alert' | 'info' = 'success') => {
    setToast({
      id: Date.now().toString(),
      title,
      message,
      type,
    });
  };

  // SOS status
  const activeSosRooms = rooms.filter((r) => r.status === 'sos');
  const hasActiveSos = activeSosRooms.length > 0;

  // Handlers
  const handleAddPatient = (newPatient: PatientRecord) => {
    setPatients((prev) => [newPatient, ...prev]);
    setSelectedPatientId(newPatient.id);
    showToast('Tạo Hồ Sơ Thành Công', `Bệnh nhân ${newPatient.name} (${newPatient.id}) đã được thêm vào hệ thống HL7 FHIR.`);
  };

  const handleInspectFhir = (patient: PatientRecord) => {
    setFhirPatient(patient);
    setIsFhirModalOpen(true);
  };

  const handleDeletePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    if (selectedPatientId === id) {
      const remaining = patients.filter((p) => p.id !== id);
      if (remaining.length > 0) setSelectedPatientId(remaining[0].id);
    }
    showToast('Đã Xóa Hồ Sơ', `Hồ sơ ${id} đã được lưu trữ vào kho lưu trữ bảo mật.`);
  };

  const handleExportPdf = (patient: PatientRecord) => {
    showToast('Xuất File PDF', `Đang xuất Báo cáo Bệnh án Điện tử của ${patient.name}...`);
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Bệnh Án HL7/FHIR - ${patient.name}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
              .header { border-bottom: 3px solid #004340; padding-bottom: 16px; margin-bottom: 24px; }
              h1 { color: #004340; margin: 0 0 6px 0; font-size: 24px; text-transform: uppercase; }
              .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold; }
              .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
              .card { background: #f8fafc; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px; margin-bottom: 16px; }
              .card h3 { margin-top: 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 15px; }
              .vital-pill { display: inline-block; margin-right: 12px; margin-bottom: 8px; background: white; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 6px; }
              .signature { margin-top: 50px; text-align: right; }
            </style>
          </head>
          <body>
            <div class="header">
              <span class="badge">HỒ SƠ BỆNH ÁN HL7® FHIR® R4 CHUẨN QUỐC TẾ</span>
              <h1>TỔ HỢP Y TẾ QUỐC TẾ & NGHỈ DƯỠNG LÃO KHOA GRANDCARE</h1>
              <p style="margin: 0; color: #64748b; font-size: 13px;">Bảo mật Cấp độ 3 • Mã hồ sơ lưu trữ: <strong>${patient.id}</strong></p>
            </div>

            <div class="card">
              <h3>THÔNG TIN HÀNH CHÍNH BỆNH NHÂN</h3>
              <p><strong>Họ và tên:</strong> ${patient.name} | <strong>Giới tính:</strong> ${patient.gender} | <strong>Tuổi:</strong> ${patient.age} (${patient.dob})</p>
              <p><strong>Số CCCD:</strong> ${patient.cccd} | <strong>Số thẻ BHYT:</strong> ${patient.insurance}</p>
              <p><strong>Vị trí buồng bệnh:</strong> ${patient.room} (${patient.wing.toUpperCase()})</p>
              <p><strong>Bác sĩ phụ trách:</strong> ${patient.doctor}</p>
            </div>

            <div class="grid">
              <div class="card">
                <h3>CHỈ SỐ SINH TỒN THỜI GIAN THỰC</h3>
                <div class="vital-pill">Nhịp tim (ECG): <strong>${patient.hr} BPM</strong></div>
                <div class="vital-pill">Huyết áp: <strong>${patient.bp} mmHg</strong></div>
                <div class="vital-pill">Bão hòa oxy SpO2: <strong>${patient.spo2}%</strong></div>
                <div class="vital-pill">Đường huyết mao mạch: <strong>${patient.glucose} mmol/L</strong></div>
              </div>

              <div class="card">
                <h3>CHẨN ĐOÁN & PHÁC ĐỒ ĐIỀU TRỊ</h3>
                <p><strong>Tiền sử bệnh lý:</strong> ${patient.history}</p>
                <p><strong>Phác đồ hiện hành:</strong> ${patient.regime}</p>
                <p><strong>Trạng thái lâm sàng:</strong> ${patient.status}</p>
              </div>
            </div>

            <div class="signature">
              <p>TP. Hồ Chí Minh, ngày ${new Date().toLocaleDateString('vi-VN')}</p>
              <p style="font-weight: bold; margin-top: 30px;">BÁC SĨ TRƯỞNG KÍP ĐIỀU TRỊ</p>
              <p style="color: #004340; font-weight: bold;">${patient.doctor}</p>
            </div>
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  const handleTogglePrescriptionStatus = (id: string) => {
    setPrescriptions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'shipping' ? 'delivered' : 'shipping';
          return {
            ...item,
            status: nextStatus,
            statusText: nextStatus === 'delivered' ? 'ĐÃ GIAO TẬN TAY' : 'ĐANG VẬN CHUYỂN CẤP TỐC',
            deliveredTime: nextStatus === 'delivered' ? new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : undefined,
          };
        }
        return item;
      })
    );
    showToast('Cập Nhật Trạng Thái Đơn', `Đơn thuốc ${id} đã được cập nhật trạng thái.`);
  };

  const handleDispatchPrescription = (
    patientInfo: string,
    drugName: string,
    dosage: string,
    quantity: string,
    partner: 'FPT Long Châu Express' | 'Dược Phẩm An Khang'
  ) => {
    const parts = patientInfo.split('|');
    const patientName = parts[1] || patientInfo;
    const patientEhr = parts[0] || 'EHR-2026-NEW';
    const patientAge = parseInt(parts[2]) || 65;

    const newOrder: Prescription = {
      id: `RX-${partner === 'Dược Phẩm An Khang' ? 'AK' : 'LC'}-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName,
      patientEhr,
      patientAge,
      patientGender: 'Nam',
      drugs: [
        {
          name: drugName,
          dosage,
          quantity,
        },
      ],
      partner,
      hub: partner === 'Dược Phẩm An Khang' ? 'Kho Dược Trung Tâm An Khang CS1' : 'Trung Tâm Dược Phẩm FPT Long Châu CS2',
      hubAddress: 'Quận 2, TP. Hồ Chí Minh',
      status: 'shipping',
      statusText: 'ĐANG VẬN CHUYỂN CẤP TỐC',
      shipperNote: 'Thùng lạnh y tế 2-8°C, ưu tiên hỏa tốc buồng bệnh VIP',
      safetyCheck: 'Đã thẩm định tương tác thuốc tự động (Drug-Drug Interaction Checked OK)',
      etaMinutes: 18,
    };

    setPrescriptions((prev) => [newOrder, ...prev]);

    const newLog: ApiLogEntry = {
      id: `log-${Date.now()}`,
      tag: partner === 'Dược Phẩm An Khang' ? 'ANKHANG_DISPATCH' : 'LONGCHAU_API',
      message: `POST /rx/dispatch HTTP/1.1 - 200 OK. Đơn ${newOrder.id} cho ${patientName} (${patientEhr})`,
      time: new Date().toLocaleTimeString('vi-VN'),
      type: 'success',
    };
    setApiLogs((prev) => [newLog, ...prev]);

    showToast('Phát Thuốc Tốc Hành', `Đã kích hoạt điều phối gói thuốc ${newOrder.id} qua ${partner}.`);
  };

  const handleAddDoctor = (newDoc: DoctorProfile) => {
    setDoctors((prev) => [...prev, newDoc]);
    showToast('Hội Đồng Y Khoa', `Bác sĩ ${newDoc.name} (${newDoc.specialty}) đã được bổ nhiệm vào danh bạ.`);
  };

  const handleUpdateRoomStatus = (roomId: string, status: RoomData['status']) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          return { ...r, status };
        }
        return r;
      })
    );
    showToast('Cập Nhật Phòng Bệnh', `Phòng ${roomId} đã được cập nhật trạng thái mới: ${status.toUpperCase()}`);
  };

  const handleResolveSosRoom = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          return {
            ...r,
            status: 'occupied',
          };
        }
        return r;
      })
    );
    showToast('Cảnh Báo Đã Tiếp Nhận', `Kíp trực đã nhận xử lý bệnh nhân tại phòng ${roomId}.`, 'info');
  };

  const handleTriggerCodeRed = () => {
    showToast('CODE RED KÍCH HOẠT', 'Hệ thống đã kích hoạt Cấp Cứu Báo Động Đỏ Toàn Viện! Kíp Hồi sức ICU và Đội Cơ Động đang di chuyển.', 'alert');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#004340] selection:text-white">
      {/* Fixed Header */}
      <Header
        onOpenSosModal={() => setIsSosModalOpen(true)}
        hasActiveSos={hasActiveSos}
      />

      {/* Main Container Layout */}
      <div className="flex pt-16">
        {/* Left Fixed Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenSosModal={() => setIsSosModalOpen(true)}
          hasActiveSos={hasActiveSos}
        />

        {/* Content View Area */}
        <main className="ml-72 flex-1 p-6 min-h-[calc(100vh-4rem)] max-w-full overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <DashboardScreen
              onNavigate={setActiveTab}
              onOpenSos={() => setIsSosModalOpen(true)}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'ehr' && (
            <EhrScreen
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onOpenAddModal={() => setIsAddPatientOpen(true)}
              onOpenFhirModal={handleInspectFhir}
              onExportPdf={handleExportPdf}
            />
          )}

          {activeTab === 'pharmacy' && (
            <PharmacyScreen
              prescriptions={prescriptions}
              onToggleStatus={handleTogglePrescriptionStatus}
              onDispatchOrder={handleDispatchPrescription}
              apiLogs={apiLogs}
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorsScreen
              doctors={doctors}
              onAddDoctor={handleAddDoctor}
              onOpenConsultationRoom={(docName) => {
                setActiveVideoCall({ roomTitle: `Hội Chẩn Trực Tuyến cùng ${docName}`, doctorName: docName });
              }}
              onShowToast={(title, msg) => showToast(title, msg, 'info')}
            />
          )}

          {activeTab === 'telehealth' && (
            <TelehealthScreen
              appointments={appointments}
              onOpenDeviceTest={() => setIsDeviceTestOpen(true)}
              onOpenConsultation={(roomTitle) => {
                setActiveVideoCall({ roomTitle });
              }}
              onShowToast={(title, msg) => showToast(title, msg, 'info')}
            />
          )}

          {activeTab === 'rooms' && (
            <RoomsScreen
              rooms={rooms}
              onUpdateRoomStatus={handleUpdateRoomStatus}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'dispatch' && (
            <DispatchScreen
              fleet={fleet}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Modals & Overlays */}
      <AddPatientModal
        isOpen={isAddPatientOpen}
        onClose={() => setIsAddPatientOpen(false)}
        onAddPatient={handleAddPatient}
      />

      <FhirViewerModal
        isOpen={isFhirModalOpen}
        onClose={() => {
          setIsFhirModalOpen(false);
          setFhirPatient(null);
        }}
        patient={fhirPatient}
        onDeletePatient={handleDeletePatient}
        onExportPdf={handleExportPdf}
      />

      <DeviceTestModal
        isOpen={isDeviceTestOpen}
        onClose={() => setIsDeviceTestOpen(false)}
        onConfirmReady={() => {
          setIsDeviceTestOpen(false);
          showToast('Thiết Bị Sẵn Sàng', 'Micro, Camera và Băng thông đạt chuẩn WebRTC 4K AES-256.');
        }}
      />

      <SosAlertModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
        activeSosRooms={activeSosRooms}
        onResolveRoom={handleResolveSosRoom}
        onTriggerCodeRed={handleTriggerCodeRed}
      />

      {/* Real-time Telehealth Video Consultation Overlay */}
      {activeVideoCall && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-teal-500/30 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col text-white">
            <div className="px-6 py-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
                <span className="material-symbols-outlined text-teal-400">videocam</span>
                <div>
                  <h3 className="font-bold text-white text-base">{activeVideoCall.roomTitle}</h3>
                  <p className="text-xs text-teal-300 font-mono">WebRTC Secure P2P (AES-256) • 60 FPS • Độ trễ 18ms</p>
                </div>
              </div>
              <button
                onClick={() => setActiveVideoCall(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80"
                alt="Telehealth consultation video stream"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              {/* Patient PIP Overlay */}
              <div className="absolute bottom-6 right-6 w-48 h-32 rounded-xl overflow-hidden border-2 border-teal-500 shadow-xl bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80"
                  alt="Doctor Stream PIP"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-2 text-[10px] bg-black/60 px-1.5 py-0.5 rounded text-white font-mono">
                  Bác sĩ Trực
                </span>
              </div>

              {/* Vitals Telemetry HUD */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-teal-500/40 rounded-xl p-3 flex gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">HR</span>
                  <span className="text-rose-400 font-bold">78 bpm</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">SpO2</span>
                  <span className="text-emerald-400 font-bold">98%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Huyết áp</span>
                  <span className="text-amber-400 font-bold">120/80</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/90 border-t border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Microphone', 'Đã tắt/bật micro thoại.')}
                  className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full text-white transition"
                  title="Bật/Tắt Micro"
                >
                  <span className="material-symbols-outlined">mic</span>
                </button>
                <button
                  onClick={() => showToast('Camera', 'Đã chuyển đổi góc máy camera PTZ.')}
                  className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full text-white transition"
                  title="Bật/Tắt Camera"
                >
                  <span className="material-symbols-outlined">videocam</span>
                </button>
                <button
                  onClick={() => showToast('Chia sẻ màn hình', 'Đang chia sẻ hồ sơ bệnh án EHR.')}
                  className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full text-white transition"
                  title="Chia sẻ kết quả xét nghiệm"
                >
                  <span className="material-symbols-outlined">screen_share</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setActiveVideoCall(null);
                  showToast('Kết Thúc Buổi Khám', 'Biên bản khám lâm sàng Telehealth đã được lưu vào hệ thống EHR.');
                }}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-semibold flex items-center gap-2 transition"
              >
                <span className="material-symbols-outlined">call_end</span>
                Kết thúc cuộc gọi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
