export type NavTab =
  | 'dashboard'
  | 'ehr'
  | 'pharmacy'
  | 'doctors'
  | 'telehealth'
  | 'rooms'
  | 'dispatch';

export interface PatientRecord {
  id: string; // e.g. EHR-2026-0891
  name: string;
  age: number;
  dob: string;
  gender: 'Nam' | 'Nữ';
  room: string;
  doctor: string;
  status: 'Ổn Định' | 'Theo Dõi Nhịp Tim' | 'Phục Hồi Hậu Tai Biến' | 'Mới Tiếp Nhận';
  statusCategory: 'stable' | 'watch' | 'rehab' | 'new';
  wing: 'sala' | 'bachdang' | 'thaodien';
  hr: number;
  bp: string;
  spo2: number;
  glucose: number;
  history: string;
  regime: string;
  cccd: string;
  insurance: string;
  avatar: string;
}

export interface Prescription {
  id: string; // e.g. RX-LC-9011
  patientName: string;
  patientEhr: string;
  patientAge: number;
  patientGender: 'Nam' | 'Nữ';
  drugs: Array<{
    name: string;
    dosage: string;
    quantity: string;
    note?: string;
  }>;
  partner: 'FPT Long Châu Express' | 'Dược Phẩm An Khang';
  hub: string;
  hubAddress: string;
  status: 'shipping' | 'delivered';
  statusText: string;
  shipperNote: string;
  deliveredTime?: string;
  safetyCheck: string;
  etaMinutes: number;
}

export interface DoctorProfile {
  id: string;
  name: string;
  titleBadge: string;
  role: string;
  specialty: string;
  experienceYears: number;
  licenseNumber: string;
  shifts: string;
  status: 'active' | 'consulting' | 'ready' | 'on_call';
  statusLabel: string;
  avatar: string;
  borderColor: string;
  statusColorClass: string;
}

export interface RoomData {
  id: string; // e.g. 205
  name: string;
  wingKey: 'wing1' | 'wing2' | 'wing3';
  wingName: string;
  type: string;
  status: 'occupied' | 'vacant' | 'hepa' | 'sos';
  patientName?: string;
  patientAge?: number;
  patientCode?: string;
  vitals?: {
    hr: number;
    bp?: string;
    spo2: number;
    notes?: string;
  };
  bedMode?: string;
  airPressure?: string;
  temp?: number;
  hepaPercent?: number;
  hepaRemainingMin?: number;
  fallSensorActive?: boolean;
}

export interface TelehealthAppointment {
  id: string;
  time: string;
  duration: string;
  statusBadge: string;
  isUrgent?: boolean;
  isActive?: boolean;
  type: 'Khám Trực Tiếp VIP' | 'Telehealth Video HD' | 'Khám Trực Tiếp & Trị Liệu' | 'Grand Round Telehealth Quốc Tế';
  ehrId: string;
  patientName: string;
  patientDetails: string;
  diagnosis: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar?: string;
  roomInfo: string;
  ecgSummary?: string;
  panelExperts?: string[];
}

export interface AmbulanceUnit {
  id: string;
  name: string;
  model: string;
  leader: string;
  nurse: string;
  driver: string;
  status: 'dispatched' | 'ready' | 'transferring';
  statusBadge: string;
  etaMinutes?: number;
  speedKmh?: number;
  location: string;
  oxygenPressureBar?: number;
  progressPercent: number;
}

export interface ApiLogEntry {
  id: string;
  tag: string;
  message: string;
  time: string;
  type: 'success' | 'info' | 'warn';
}
