import React, { useState } from 'react';
import { Prescription, ApiLogEntry } from '../../types';

interface PharmacyScreenProps {
  prescriptions: Prescription[];
  onToggleStatus: (id: string) => void;
  onDispatchOrder: (
    patientInfo: string,
    drugName: string,
    dosage: string,
    quantity: string,
    partner: 'FPT Long Châu Express' | 'Dược Phẩm An Khang'
  ) => void;
  apiLogs: ApiLogEntry[];
}

export const PharmacyScreen: React.FC<PharmacyScreenProps> = ({
  prescriptions,
  onToggleStatus,
  onDispatchOrder,
  apiLogs,
}) => {
  const [selectedPatientRaw, setSelectedPatientRaw] = useState(
    'EHR-2026-1190|Bùi Văn Thịnh|65|I10'
  );
  const [selectedDrug, setSelectedDrug] = useState(
    'Telmisartan 40mg + Hydrochlorothiazide 12.5mg'
  );
  const [dosage, setDosage] = useState('1 viên / ngày (Sáng)');
  const [quantity, setQuantity] = useState('30 viên (1 Hộp)');
  const [instructions, setInstructions] = useState(
    'Uống sau ăn 30 phút, kiêng mặn và theo dõi huyết áp buổi sáng hàng ngày...'
  );

  const activeShippingCount = prescriptions.filter((p) => p.status === 'shipping').length;
  const completedCount = prescriptions.filter((p) => p.status === 'delivered').length + 140;

  const handleDispatch = (partner: 'FPT Long Châu Express' | 'Dược Phẩm An Khang') => {
    onDispatchOrder(selectedPatientRaw, selectedDrug, dosage, quantity, partner);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-6 py-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        {/* Top KPI & Operational Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* KPI 1 */}
          <div className="bg-surface-clean rounded-2xl p-5 shadow-sm border border-surface-container/60 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Đang giao thuốc tốc hành
              </span>
              <span className="p-1.5 rounded-lg bg-secondary-container text-on-secondary-container">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              </span>
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-sapphire-dispatch font-bold">
                {activeShippingCount}
              </span>
              <span className="font-label-md text-label-md text-emerald-deep font-semibold">
                Đơn active
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-vital-stable font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              <span>Trung bình giao: 28 phút nội thành</span>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-secondary-fixed/30 pointer-events-none"></div>
          </div>

          {/* KPI 2 */}
          <div className="bg-surface-clean rounded-2xl p-5 shadow-sm border border-surface-container/60 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Hoàn tất trong ngày
              </span>
              <span className="p-1.5 rounded-lg bg-surface-container-high text-emerald-deep">
                <span className="material-symbols-outlined text-[18px]">task_alt</span>
              </span>
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-emerald-deep font-bold">
                {completedCount}
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                Toa xuất viện
              </span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-vital-stable h-1.5 rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-surface-clean rounded-2xl p-5 shadow-sm border border-surface-container/60 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Đúng giờ chuẩn y khoa
              </span>
              <span className="p-1.5 rounded-lg bg-primary-fixed text-primary">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </span>
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-primary font-bold">99.4%</span>
              <span className="font-label-sm text-label-sm text-vital-stable font-bold">▲ +0.6%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-vital-stable"></span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                SLA dược lâm sàng 45p
              </span>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="bg-surface-clean rounded-2xl p-5 shadow-sm border border-surface-container/60 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                AI Cảnh Báo Tương Tác
              </span>
              <span className="p-1.5 rounded-lg bg-error-container text-emergency-red">
                <span className="material-symbols-outlined text-[18px]">warning</span>
              </span>
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-emergency-red font-bold">03</span>
              <span className="font-label-md text-label-md text-error">Chặn rủi ro</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm truncate">
              <span className="material-symbols-outlined text-clinical-amber text-[16px]">
                shield_with_heart
              </span>
              <span>Interactions Filtered</span>
            </div>
          </div>
        </div>

        {/* Main Content Workspace (Split Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Prescriptions Management Queue & Dispatch Hub */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Action Bar */}
            <div className="bg-surface-clean rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">hub</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                    Kho Dược &amp; Đơn Thuốc Liên Kết
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Đồng bộ tự động API FPT Long Châu Express &amp; Dược Phẩm An Khang Bridge
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full border border-surface-container/50">
                <span className="w-2.5 h-2.5 rounded-full bg-vital-stable animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Gateway Sync: <span className="text-vital-stable font-bold">Online (12ms)</span>
                </span>
              </div>
            </div>

            {/* Prescriptions List Table Card */}
            <div className="bg-surface-clean rounded-2xl shadow-sm border border-surface-container/60 overflow-hidden flex flex-col">
              <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container/50">
                <div className="flex items-center gap-3">
                  <span className="font-title-sm text-title-sm text-on-surface font-bold uppercase tracking-wider">
                    Danh Sách Kê Toa &amp; Chuyển Kho Dược
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-primary-container text-on-primary font-bold">
                    {prescriptions.length} Đơn trực tuyến
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]">touch_app</span>
                  <span>1-Chạm cập nhật trạng thái ngay</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      <th className="py-3 px-4">Mã Toa / Bệnh Nhân</th>
                      <th className="py-3 px-4">Dược Phẩm Kê Toa</th>
                      <th className="py-3 px-4">Đối Tác Kho</th>
                      <th className="py-3 px-4">Trạng Thái Vận Chuyển</th>
                      <th className="py-3 px-4 text-right">Thao Tác 1-Chạm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-low font-body-sm text-body-sm">
                    {prescriptions.map((rx) => {
                      const isShipping = rx.status === 'shipping';
                      return (
                        <tr
                          key={rx.id}
                          className="hover:bg-surface-container-low/40 transition-colors"
                        >
                          {/* Col 1 */}
                          <td className="py-4 px-4 align-top">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-title-sm text-title-sm text-primary font-bold">
                                  {rx.id}
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-sapphire-dispatch font-label-sm text-label-sm font-semibold">
                                  FHIR R4
                                </span>
                              </div>
                              <span className="font-title-sm text-title-sm text-on-surface font-semibold mt-0.5">
                                {rx.patientName}
                              </span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                {rx.patientEhr} • {rx.patientAge} Tuổi ({rx.patientGender})
                              </span>
                            </div>
                          </td>

                          {/* Col 2 */}
                          <td className="py-4 px-4 align-top">
                            <div className="flex flex-col gap-1">
                              {rx.drugs.map((drug, idx) => (
                                <div key={idx} className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-deep"></span>
                                  <span className="font-body-md text-body-md text-on-surface font-medium">
                                    {drug.name}
                                  </span>
                                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                                    x {drug.quantity} ({drug.dosage})
                                  </span>
                                </div>
                              ))}
                              <span className="text-vital-stable font-label-sm text-label-sm flex items-center gap-1 mt-1">
                                <span className="material-symbols-outlined text-[14px]">
                                  verified
                                </span>{' '}
                                {rx.safetyCheck}
                              </span>
                            </div>
                          </td>

                          {/* Col 3 */}
                          <td className="py-4 px-4 align-top">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-7 h-7 rounded flex items-center justify-center ${
                                  rx.partner === 'FPT Long Châu Express'
                                    ? 'bg-secondary-fixed text-sapphire-dispatch'
                                    : 'bg-tertiary-fixed text-tertiary'
                                }`}
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  domain
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                                  {rx.hub}
                                </span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">
                                  {rx.hubAddress}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Col 4 */}
                          <td className="py-4 px-4 align-top">
                            {isShipping ? (
                              <div>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold">
                                  <span className="material-symbols-outlined text-[16px] animate-spin">
                                    autorenew
                                  </span>
                                  <span>Đang vận chuyển</span>
                                </div>
                                <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                                  {rx.shipperNote}
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-vital-stable font-label-md text-label-md font-bold">
                                  <span className="material-symbols-outlined text-[16px]">
                                    check_circle
                                  </span>
                                  <span>Đã giao bệnh nhân</span>
                                </div>
                                <div className="font-label-sm text-label-sm text-vital-stable mt-1 font-medium">
                                  {rx.shipperNote}
                                </div>
                              </div>
                            )}
                          </td>

                          {/* Col 5: 1-Touch Toggle Button */}
                          <td className="py-4 px-4 align-top text-right">
                            {isShipping ? (
                              <button
                                onClick={() => onToggleStatus(rx.id)}
                                className="px-3 py-1.5 rounded-lg bg-vital-stable text-on-primary hover:opacity-90 font-label-md text-label-md font-bold shadow-sm transition-all flex items-center gap-1 ml-auto"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  done_all
                                </span>
                                <span>Xác nhận Đã giao</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => onToggleStatus(rx.id)}
                                className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md font-semibold transition-all flex items-center gap-1 ml-auto"
                              >
                                <span className="material-symbols-outlined text-[16px]">undo</span>
                                <span>Chuyển lại Đang ship</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Bottom Bar */}
              <div className="p-3 bg-surface-container-low flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant border-t border-surface-container/50">
                <span>Hiển thị {prescriptions.length} trên {prescriptions.length} toa mới nhất</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-sapphire-dispatch font-medium">
                    <span className="w-2 h-2 rounded-full bg-sapphire-dispatch"></span> FPT Long Châu
                    Bridge (Active)
                  </span>
                  <span className="flex items-center gap-1 text-clinical-amber font-medium">
                    <span className="w-2 h-2 rounded-full bg-clinical-amber"></span> An Khang Dispatch
                    API (Active)
                  </span>
                </div>
              </div>
            </div>

            {/* Realtime Delivery Live Map & Pipeline Simulation */}
            <div className="bg-surface-clean rounded-2xl p-4 shadow-sm border border-surface-container/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sapphire-dispatch text-[20px]">
                    explore
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold">
                    Giám Sát Vận Chuyển Toa Thuốc Ngoại Trú (GPS Fleet)
                  </span>
                </div>
                <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                  Tự động cập nhật 5s
                </span>
              </div>

              <div
                className="w-full h-48 bg-cover bg-center rounded-xl relative overflow-hidden flex items-end p-4 shadow-inner"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAI4Zq25GVMh0qiQkWeygcPmLMYd-QzUjnev07SVba_CchVLX69f3Ml2NxMqkmKCiO8cDUo9x5NAxFlRS4juDtHaAkJRUfJdZ0tnbT11GEl6GdhGUCO62zJbrNoSsehIzg6cdUHX4Mf6WAY_9YwhlKgG_rhUZNRwaJTZm2LzKbVyZVOBikpVIw19xfxD5FYwwWjAKCAVReWUnsVf-KhnFrYfYMNM9k97a_fpnYiDvvUDqlOBAPPdJxD')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent pointer-events-none"></div>
                <div className="relative z-10 flex flex-wrap items-center justify-between w-full text-on-primary">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-surface-clean/20 backdrop-blur-md">
                      <span className="material-symbols-outlined text-on-primary text-[20px]">
                        electric_moped
                      </span>
                    </div>
                    <div>
                      <div className="font-title-sm text-title-sm font-bold">
                        Long Châu Express FastTrack #LC-308
                      </div>
                      <div className="font-body-sm text-body-sm text-primary-fixed">
                        Đang giao đến: 124 Nam Kỳ Khởi Nghĩa, Q.3 (BN Nguyễn Văn An)
                      </div>
                    </div>
                  </div>
                  <span className="font-label-md text-label-md bg-vital-stable px-3 py-1 rounded-full text-on-primary font-bold">
                    Nhiệt kế thùng: 21.4°C (Chuẩn)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): New Prescription Form & API Bridge Dispatch Console */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-clean rounded-2xl p-5 shadow-sm border border-surface-container/60">
              {/* Form Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">post_add</span>
                  </div>
                  <div>
                    <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                      Kê Đơn &amp; Bắn API Kho
                    </h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Tích hợp toa điện tử Liên Viện
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">
                  EHR Live Sync
                </span>
              </div>

              {/* Interaction Warning Box */}
              <div className="p-3 rounded-xl bg-surface-container-low text-on-surface flex items-start gap-2.5 mb-4 border border-surface-container">
                <span className="material-symbols-outlined text-clinical-amber text-[20px] shrink-0 mt-0.5">
                  verified_user
                </span>
                <div className="text-body-sm font-body-sm">
                  <span className="font-bold text-emerald-deep block font-title-sm text-title-sm">
                    Dược Động Học Khớp 100%
                  </span>
                  <span className="text-on-surface-variant text-body-sm font-body-sm">
                    Hệ thống tự động rà soát tương tác thuốc theo chuẩn Dược Thư Quốc Gia.
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3.5">
                {/* Patient Selector */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface font-bold flex items-center justify-between">
                    <span>Chọn Bệnh Nhân (Liên kết EHR)</span>
                    <span className="font-label-sm text-label-sm text-telehealth-teal font-semibold">
                      ICD-10 Đồng bộ
                    </span>
                  </label>
                  <select
                    value={selectedPatientRaw}
                    onChange={(e) => setSelectedPatientRaw(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-deep font-body-md text-body-md"
                  >
                    <option value="EHR-2026-1190|Bùi Văn Thịnh|65|I10 (Tăng huyết áp vô căn)">
                      EHR-2026-1190 - Bùi Văn Thịnh (65T, Nam) - [I10 Tăng huyết áp]
                    </option>
                    <option value="EHR-2026-2005|Lê Thu Hà|48|E11 (Đái tháo đường type 2)">
                      EHR-2026-2005 - Lê Thu Hà (48T, Nữ) - [E11 ĐTĐ Type 2]
                    </option>
                    <option value="EHR-2026-0891|Nguyễn Văn An|68|I25 (Bệnh cơ tim thiếu máu)">
                      EHR-2026-0891 - Nguyễn Văn An (68T, Nam) - [I25 Bệnh mạch vành]
                    </option>
                  </select>
                </div>

                {/* Drug Item Selector */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface font-bold">
                    Danh Mục Thuốc &amp; Hoạt Chất
                  </label>
                  <select
                    value={selectedDrug}
                    onChange={(e) => setSelectedDrug(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-deep font-body-md text-body-md"
                  >
                    <option value="Telmisartan 40mg + Hydrochlorothiazide 12.5mg">
                      Telmisartan 40mg + Hydrochlorothiazide 12.5mg (Micardis Plus)
                    </option>
                    <option value="Empagliflozin 10mg (Jardiance)">
                      Empagliflozin 10mg (Jardiance 10mg)
                    </option>
                    <option value="Atorvastatin 20mg (Lipitor)">Atorvastatin 20mg (Lipitor)</option>
                    <option value="Nexium 40mg (Esomeprazole)">
                      Nexium 40mg (Esomeprazole AstraZeneca)
                    </option>
                  </select>
                </div>

                {/* Dosage & Quantity */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface font-bold">
                      Liều Lượng Dùng
                    </label>
                    <input
                      type="text"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      className="h-11 px-3 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-deep font-body-md text-body-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface font-bold">
                      Số Lượng Cấp
                    </label>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="h-11 px-3 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-deep font-body-md text-body-md"
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface font-bold">
                    Hướng Dẫn Bệnh Nhân &amp; Lưu Ý Lâm Sàng
                  </label>
                  <textarea
                    rows={2}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="p-3 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-emerald-deep font-body-md text-body-md resize-none"
                  />
                </div>

                {/* API Target Buttons */}
                <div className="pt-1 flex flex-col gap-2.5">
                  <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                    Chọn Điểm Bắn Đơn Qua API Đối Tác:
                  </div>

                  {/* Button 1: FPT Long Châu */}
                  <button
                    type="button"
                    onClick={() => handleDispatch('FPT Long Châu Express')}
                    className="w-full h-12 rounded-xl bg-sapphire-dispatch text-on-primary hover:opacity-95 transition-all shadow-md flex items-center justify-between px-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-surface-clean/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary text-[18px]">
                          send_and_archive
                        </span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-title-sm text-title-sm font-bold leading-tight">
                          Bắn Sang FPT Long Châu Express
                        </span>
                        <span className="font-label-sm text-label-sm text-secondary-container">
                          Giao hỏa tốc &lt; 30 phút (API R4)
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                      bolt
                    </span>
                  </button>

                  {/* Button 2: Dược Phẩm An Khang */}
                  <button
                    type="button"
                    onClick={() => handleDispatch('Dược Phẩm An Khang')}
                    className="w-full h-12 rounded-xl bg-emerald-deep text-on-primary hover:opacity-95 transition-all shadow-md flex items-center justify-between px-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-surface-clean/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary text-[18px]">
                          cloud_sync
                        </span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-title-sm text-title-sm font-bold leading-tight">
                          Bắn Sang Kho Dược An Khang
                        </span>
                        <span className="font-label-sm text-label-sm text-primary-fixed">
                          Đồng bộ mã định danh VNP-Hub
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                      send
                    </span>
                  </button>
                </div>

                {/* Pharmacist Signature Badge */}
                <div className="mt-1 p-2.5 rounded-lg bg-surface-container flex items-center justify-between font-label-sm text-label-sm">
                  <div className="flex items-center gap-1.5 text-on-surface">
                    <span className="material-symbols-outlined text-emerald-deep text-[18px]">
                      verified
                    </span>
                    <span>
                      Ký số Bác Sĩ: <strong className="font-bold">BS.CKII Vũ Thành Long</strong>
                    </span>
                  </div>
                  <span className="text-vital-stable font-bold">RSA 2048-bit</span>
                </div>
              </form>
            </div>

            {/* Real-Time API Activity Log */}
            <div className="bg-surface-clean rounded-2xl p-5 shadow-sm border border-surface-container/60">
              <div className="flex items-center justify-between mb-3">
                <span className="font-title-sm text-title-sm text-on-surface font-bold">
                  Nhật Ký Giao Dịch API Real-Time
                </span>
                <span className="w-2 h-2 rounded-full bg-vital-stable animate-ping"></span>
              </div>

              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                {apiLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm flex items-start justify-between border border-surface-container/40"
                  >
                    <div>
                      <span className="font-bold text-sapphire-dispatch">[{log.tag}]</span>{' '}
                      <span className="text-on-surface">{log.message}</span>
                      <div className="font-label-sm text-label-sm text-vital-stable mt-0.5">
                        Sync Code 200 OK • HL7 FHIR Payload Passed
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono shrink-0 ml-2">
                      {log.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
