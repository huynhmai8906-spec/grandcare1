import React, { useState } from 'react';
import { PatientRecord } from '../../types';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (newPatient: PatientRecord) => void;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onAddPatient,
}) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('1955-06-15');
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [cccd, setCccd] = useState('');
  const [insurance, setInsurance] = useState('GD4790');
  const [room, setRoom] = useState('Phòng 303 Villa Sen Vàng Sala');
  const [doctor, setDoctor] = useState('PGS.TS Trần Vinh Quang');
  const [history, setHistory] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const birthYear = new Date(dob).getFullYear() || 1955;
    const age = new Date().getFullYear() - birthYear;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `EHR-2026-${randomSuffix}`;

    // Determine wing
    let wing: 'sala' | 'bachdang' | 'thaodien' = 'sala';
    if (room.includes('Bạch Đằng')) wing = 'bachdang';
    else if (room.includes('Thảo Điền')) wing = 'thaodien';

    const newRecord: PatientRecord = {
      id: newId,
      name: name.trim(),
      age: Math.max(18, age),
      dob,
      gender,
      room,
      doctor,
      status: 'Mới Tiếp Nhận',
      statusCategory: 'new',
      wing,
      hr: 75,
      bp: '120/80',
      spo2: 99.0,
      glucose: 5.5,
      history: history.trim() || 'Chưa ghi nhận tiền sử dị ứng đặc biệt.',
      regime: 'Đang chờ hội đồng lâm sàng phê duyệt phác đồ cá nhân hóa.',
      cccd: cccd.trim() || '079055001234',
      insurance: insurance.trim() || 'GD4790123456789',
      avatar:
        gender === 'Nữ'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_WFbb0Dwr075Q0QQ0BUenFoKtKjlh6KEH5umv9mqUGlngW9s5VNkQrcWcZbjlkaePerRlN5xeoa2TK74ztbTO-oTJ9RCR5KHCAPajz0YTnC7Sf2njEBHCTHUKHuz0F3TovGZUheolPlAFGtbVgFOyCj8X8_JgRMvTW8mn0Y3I-09y98k2m806ArK9wie-vT_TpnZbBf8haOKEataYzxpUkNVqjl0_IhiVG8h7m9YBf1XnaRZpU0P2'
          : 'https://lh3.googleusercontent.com/aida-public/AB6AXuB947IGp0Sj2ZwjUxj6CetyO6EOScLMDtdqCECMkUlhLV47tnkgq2axnoU5VWQ7EouoFEGEPxIajf8CHg0lZV4P4S75yjZWsjrRb0zPGP1oAUVa_5tzoCq53DMUhsmO-rHJ8pHMQIxC8OAGzuKCadhrd47rkwCpdnU5l3wITaKgH3b6m6jyOfuZ5nMWIjQHfTD4C93Ln2VRDKM8pU1pUix-BM5vuoLCfhM39LwD0ESQrh1TIziXT0yH',
    };

    onAddPatient(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-clean rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-deep text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">person_add_alt</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Tiếp Nhận &amp; Khởi Tạo Hồ Sơ Bệnh Nhân EHR
                </h3>
                <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                  HL7/FHIR R4
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Tạo hồ sơ bệnh án nội trú tiêu chuẩn y tế quốc tế và gán phòng nghỉ dưỡng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-high text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Họ và tên bệnh nhân <span className="text-emergency-red">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Đặng Thu Thảo"
                className="px-3.5 py-2.5 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:border-emerald-deep focus:ring-2 focus:ring-emerald-deep/20 text-on-surface font-body-md text-body-md"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Giới tính <span className="text-emergency-red">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 h-11">
                <button
                  type="button"
                  onClick={() => setGender('Nam')}
                  className={`rounded-lg border text-title-sm font-semibold transition-all ${
                    gender === 'Nam'
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container'
                  }`}
                >
                  Nam
                </button>
                <button
                  type="button"
                  onClick={() => setGender('Nữ')}
                  className={`rounded-lg border text-title-sm font-semibold transition-all ${
                    gender === 'Nữ'
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container'
                  }`}
                >
                  Nữ
                </button>
              </div>
            </div>

            {/* DOB */}
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Ngày sinh (DOB) <span className="text-emergency-red">*</span>
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="px-3.5 py-2.5 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:border-emerald-deep focus:ring-2 focus:ring-emerald-deep/20 text-on-surface font-body-md text-body-md"
              />
            </div>

            {/* CCCD */}
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Số CCCD / Định danh quốc gia <span className="text-emergency-red">*</span>
              </label>
              <input
                type="text"
                required
                value={cccd}
                onChange={(e) => setCccd(e.target.value)}
                placeholder="079055001234"
                className="px-3.5 py-2.5 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:border-emerald-deep focus:ring-2 focus:ring-emerald-deep/20 text-on-surface font-body-md text-body-md font-mono"
              />
            </div>

            {/* Insurance */}
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Mã thẻ BHYT / Bảo hiểm Quốc Tế <span className="text-emergency-red">*</span>
              </label>
              <input
                type="text"
                required
                value={insurance}
                onChange={(e) => setInsurance(e.target.value)}
                placeholder="GD4790123456789"
                className="px-3.5 py-2.5 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:border-emerald-deep focus:ring-2 focus:ring-emerald-deep/20 text-on-surface font-body-md text-body-md font-mono"
              />
            </div>

            {/* Room */}
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Phòng bố trí nghỉ dưỡng <span className="text-emergency-red">*</span>
              </label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="px-3.5 py-2.5 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:border-emerald-deep focus:ring-2 focus:ring-emerald-deep/20 text-on-surface font-body-md text-body-md"
              >
                <option value="Phòng 303 Villa Sen Vàng Sala">Phòng 303 - Villa Sen Vàng Sala</option>
                <option value="Phòng 301 Villa Sen Vàng Sala">Phòng 301 - Villa Sen Vàng Sala</option>
                <option value="Phòng 206 Premier Bạch Đằng">Phòng 206 - Premier Bạch Đằng</option>
                <option value="Phòng 109 Sanctuary Thảo Điền">Phòng 109 - Sanctuary Thảo Điền</option>
                <option value="Phòng VIP 501 Presidential Suite">Phòng VIP 501 - Presidential Suite</option>
              </select>
            </div>

            {/* Doctor in charge */}
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Bác sĩ điều trị phụ trách <span className="text-emergency-red">*</span>
              </label>
              <select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="px-3.5 py-2.5 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:border-emerald-deep focus:ring-2 focus:ring-emerald-deep/20 text-on-surface font-body-md text-body-md"
              >
                <option value="PGS.TS Trần Vinh Quang">PGS.TS Trần Vinh Quang (Tim mạch can thiệp)</option>
                <option value="TS.BS Lê Hồng Hùng">TS.BS Lê Hồng Hùng (Lão khoa & Loạn nhịp tim)</option>
                <option value="BSCKII Vũ Thị Mai">BSCKII Vũ Thị Mai (Phục hồi chức năng đột quỵ)</option>
                <option value="ThS.BS Lê Hoàng Long">ThS.BS Lê Hoàng Long (Nội tiết & Giảm nhẹ)</option>
              </select>
            </div>
          </div>

          {/* History */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-on-surface font-semibold">
              Tiền sử bệnh, Dị ứng &amp; Chẩn đoán ban đầu
            </label>
            <textarea
              rows={3}
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              placeholder="Ví dụ: Rung nhĩ kịch phát, tiền sử tai biến thoáng qua TIA (2023), Dị ứng Penicillin..."
              className="px-3.5 py-2.5 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:border-emerald-deep focus:ring-2 focus:ring-emerald-deep/20 text-on-surface font-body-md text-body-md resize-none"
            />
          </div>

          {/* Automatic HL7 Notice */}
          <div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 border border-emerald-deep/10">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-deep text-[28px]">auto_awesome</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-title-sm text-title-sm font-bold text-primary">
                    Tự động cấu trúc chuẩn HL7/FHIR Release 4
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-deep text-on-primary font-label-sm text-label-sm font-bold">
                    100% FHIR Conformant
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Hệ thống sẽ biên dịch thành Patient, Encounter &amp; Condition FHIR Resource tự động.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors font-title-sm text-title-sm font-semibold"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-deep text-on-primary hover:bg-primary transition-all font-title-sm text-title-sm font-bold shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span>Khởi Tạo Hồ Sơ &amp; Sinh FHIR R4</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
