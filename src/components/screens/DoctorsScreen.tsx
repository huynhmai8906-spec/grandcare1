import React, { useState } from 'react';
import { DoctorProfile } from '../../types';

interface DoctorsScreenProps {
  doctors: DoctorProfile[];
  onAddDoctor: (newDoctor: DoctorProfile) => void;
  onOpenConsultationRoom?: (docName: string) => void;
  onShowToast: (title: string, message: string) => void;
}

export const DoctorsScreen: React.FC<DoctorsScreenProps> = ({
  doctors,
  onAddDoctor,
  onOpenConsultationRoom,
  onShowToast,
}) => {
  const [filterState, setFilterState] = useState<'all' | 'active' | 'consulting' | 'ready'>('all');
  const [weekOffset, setWeekOffset] = useState(0);

  // Form states
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [license, setLicense] = useState('');
  const [shifts, setShifts] = useState({ sang: true, chieu: false, dem: false });
  const [showSuccessNotice, setShowSuccessNotice] = useState(false);

  const filteredDoctors = doctors.filter((doc) => {
    if (filterState === 'all') return true;
    if (filterState === 'active') return doc.status === 'active' || doc.status === 'on_call';
    if (filterState === 'consulting') return doc.status === 'consulting';
    if (filterState === 'ready') return doc.status === 'ready';
    return true;
  });

  const handleCreateDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !specialty || !license) return;

    const registeredShifts: string[] = [];
    if (shifts.sang) registeredShifts.push('Ca Sáng');
    if (shifts.chieu) registeredShifts.push('Ca Chiều');
    if (shifts.dem) registeredShifts.push('Đêm C/C');

    const newDoc: DoctorProfile = {
      id: `doc-${Date.now()}`,
      name: `${title} ${name}`,
      titleBadge: title,
      role: `Cố Vấn Chuyên Môn ${specialty}`,
      specialty,
      experienceYears: 12,
      licenseNumber: license,
      shifts: registeredShifts.join(', ') || 'Theo phân công',
      status: 'ready',
      statusLabel: 'Sẵn sàng trực',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDWqWXQF0lKcR_wVefp_JQrJ0LkpaGKYH28ZnOjs3NPdsMXte7KOeSMEVcWm0u4r2fvio6WE_SShyOw834dxztsqTsO8qzNPxNiSILR3tFUQSzGPY1gCCzyxFdFbHieLJOFXEaF7OHvqa5UDIK-rJnxsYFnGebCqSJpbKXwBLJvE57p98ggp6Tyh3d_ijpMiGkTfDvmL3f1M1Icx_1nHJbeErS3z6bj8PUJ4KxwzJJlvvz6IfUG3twS',
      borderColor: 'border-primary',
      statusColorClass: 'bg-emerald-deep/10 text-emerald-deep',
    };

    onAddDoctor(newDoc);
    setShowSuccessNotice(true);
    setName('');
    setTitle('');
    setSpecialty('');
    setLicense('');

    onShowToast(
      'Tiếp Nhận Hồ Sơ Bác Sĩ Mới',
      `Đã thêm ${newDoc.name} vào danh sách Hội Đồng Y Khoa.`
    );

    setTimeout(() => {
      setShowSuccessNotice(false);
    }, 4500);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-6 py-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        {/* Top Analytical & Status Stream */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          {/* 8 Cols Analytical Card */}
          <div className="xl:col-span-8 bg-surface-clean rounded-2xl p-6 shadow-sm border border-surface-container/60 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-48 h-48 bg-emerald-deep/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary-container text-on-primary">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                </span>
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Hội Đồng Khoa Học Kỹ Thuật &amp; Cố Vấn Cấp Cao
                  </span>
                  <h2 className="font-headline-md text-headline-md text-primary font-bold">
                    Hội Đồng Y Khoa Quản Trị Lâm Sàng
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-full border border-surface-container">
                <span className="w-2.5 h-2.5 rounded-full bg-vital-stable animate-pulse"></span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Túc Trực 24/7: 5 Chuyên Gia Đầu Ngành
                </span>
              </div>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mb-4 leading-relaxed">
              Hội đồng y khoa chịu trách nhiệm phê duyệt phác đồ đa mô thức, bảo trợ chuyên môn cho hệ
              thống cấp cứu Dijkstra 115, và thực hiện hội chẩn Telehealth quốc tế theo tiêu chuẩn JCI &amp;
              HL7 FHIR.
            </p>

            {/* KPI Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container/50">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold block">
                  Tổng Ca Hội Chẩn Tuần
                </span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">48 Ca</span>
                <div className="flex items-center gap-1 mt-0.5 text-vital-stable font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  <span>+14% so với tuần trước</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container/50">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold block">
                  Chuyên Gia Trực Tiếp
                </span>
                <span className="font-headline-sm text-headline-sm text-emerald-deep font-bold">
                  12 Bác Sĩ
                </span>
                <div className="flex items-center gap-1 mt-0.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">groups</span>
                  <span>100% Cấp Phép Bộ Y Tế</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container/50">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold block">
                  Thời Gian Phản Hồi SOS
                </span>
                <span className="font-headline-sm text-headline-sm text-emergency-red font-bold">
                  &lt; 90 Giây
                </span>
                <div className="flex items-center gap-1 mt-0.5 text-emergency-red font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  <span>Đường truyền ưu tiên</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container/50">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold block">
                  Tỷ Lệ Thành Công Can Thiệp
                </span>
                <span className="font-headline-sm text-headline-sm text-vital-stable font-bold">
                  99.4%
                </span>
                <div className="flex items-center gap-1 mt-0.5 text-vital-stable font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>Kiểm định độc lập</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Cols Live Clinical Telemetry Card */}
          <div className="xl:col-span-4 bg-sapphire-dispatch text-on-primary rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emergency-red animate-ping"></span>
                <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-surface-container-highest">
                  Trực Ban Cấp Cứu Ngoại Viện
                </span>
              </div>
              <span className="font-label-sm text-label-sm bg-surface-clean/20 px-2 py-0.5 rounded text-surface-clean font-bold">
                Live Stream
              </span>
            </div>

            <div className="my-4">
              <span className="font-label-sm text-label-sm text-secondary-fixed block mb-1">
                Bác Sĩ Trực Ban Điều Phối
              </span>
              <div className="font-title-lg text-title-lg font-bold text-surface-clean">
                BS. Huỳnh Mai
              </div>
              <p className="font-body-sm text-body-sm text-surface-container-high mt-1 leading-relaxed">
                Đang giám sát 2 xe cấp cứu chuyển viện ICU từ Quận 7 về Trung tâm Tim Mạch Can Thiệp.
              </p>

              <div className="mt-4 p-3 rounded-xl bg-surface-clean/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim">
                    sensors
                  </span>
                  <span className="font-label-sm text-label-sm text-surface-clean font-semibold">
                    Tần số vô tuyến: 154.250 MHz
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold">
                  KẾT NỐI TỐT
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() =>
                  onShowToast(
                    'Đang Kết Nối Hotline',
                    'Đang gọi điện thoại điều phối trực tiếp tới BS. Huỳnh Mai (Kênh 115)...'
                  )
                }
                className="flex-1 h-11 rounded-xl bg-surface-clean text-sapphire-dispatch font-title-sm text-title-sm font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-surface-container-lowest transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                <span>Liên Lạc Hội Đồng</span>
              </button>
              <button
                onClick={() =>
                  onShowToast(
                    'Định Vị Tọa Độ GPS',
                    'Xe ICU-02 đang tại tọa độ 10.7719° N, 106.7198° E (Mai Chí Thọ).'
                  )
                }
                className="h-11 px-3.5 rounded-xl bg-surface-clean/20 hover:bg-surface-clean/30 text-surface-clean flex items-center justify-center transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">share_location</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Workspace Layout (8 cols Directory & Matrix, 4 cols Quick Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Doctor Cards & Roster Matrix */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* 1. Doctor Directory */}
            <section className="bg-surface-clean rounded-2xl p-6 shadow-sm border border-surface-container/60">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      clinical_notes
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                      Danh Sách Giáo Sư &amp; Chuyên Gia Cố Vấn
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Hồ sơ thẩm định năng lực lâm sàng, thâm niên và tình trạng trực viện thời gian thực
                  </p>
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-surface-container">
                  <button
                    onClick={() => setFilterState('all')}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md font-bold transition-all ${
                      filterState === 'all'
                        ? 'bg-surface-clean text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Tất cả ({doctors.length})
                  </button>
                  <button
                    onClick={() => setFilterState('active')}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all ${
                      filterState === 'active'
                        ? 'bg-surface-clean text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Đang trực
                  </button>
                  <button
                    onClick={() => setFilterState('consulting')}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all ${
                      filterState === 'consulting'
                        ? 'bg-surface-clean text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Hội chẩn
                  </button>
                  <button
                    onClick={() => setFilterState('ready')}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all ${
                      filterState === 'ready'
                        ? 'bg-surface-clean text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Sẵn sàng
                  </button>
                </div>
              </div>

              {/* Doctor Cards */}
              <div className="flex flex-col gap-4">
                {filteredDoctors.map((doc) => {
                  return (
                    <div
                      key={doc.id}
                      className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 items-start md:items-center justify-between relative overflow-hidden border border-surface-container/60"
                    >
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                          doc.specialty.includes('Tim')
                            ? 'bg-primary'
                            : doc.specialty.includes('Lão')
                            ? 'bg-clinical-amber'
                            : doc.specialty.includes('ICU')
                            ? 'bg-primary'
                            : doc.specialty.includes('115')
                            ? 'bg-emergency-red'
                            : 'bg-telehealth-teal'
                        }`}
                      ></div>

                      <div className="flex items-center gap-4 min-w-0">
                        <div className="relative shrink-0">
                          <img
                            alt={doc.name}
                            className="w-20 h-20 rounded-2xl object-cover shadow-sm"
                            src={doc.avatar}
                          />
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-vital-stable ring-2 ring-surface-clean"></span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-title-lg text-title-lg font-bold text-on-surface">
                              {doc.name}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed font-bold">
                              {doc.titleBadge}
                            </span>
                          </div>
                          <div className="font-body-md text-body-md text-primary font-medium mt-0.5">
                            {doc.specialty}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 mt-1.5 text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px] text-clinical-amber">
                                workspace_premium
                              </span>{' '}
                              {doc.experienceYears} năm kinh nghiệm
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">badge</span>{' '}
                              CCHN: {doc.licenseNumber}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">
                                calendar_month
                              </span>{' '}
                              Trực: {doc.shifts}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-md text-label-md font-bold ${doc.statusColorClass}`}
                        >
                          <span className="w-2 h-2 rounded-full bg-vital-stable animate-pulse"></span>
                          {doc.statusLabel}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              onShowToast(
                                'Hồ Sơ Bác Sĩ',
                                `Đang mở hồ sơ thẩm định chuyên môn của ${doc.name}. CCHN: ${doc.licenseNumber}`
                              )
                            }
                            className="h-9 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-sm text-title-sm transition-all flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                            <span>Hồ Sơ</span>
                          </button>
                          <button
                            onClick={() => {
                              if (onOpenConsultationRoom) onOpenConsultationRoom(doc.name);
                              else
                                onShowToast(
                                  'Triệu Tập Hội Chẩn',
                                  `Đã gửi lời mời hội chẩn khẩn cấp tới ${doc.name}.`
                                );
                            }}
                            className="h-9 px-3 rounded-lg bg-primary text-on-primary hover:bg-emerald-deep font-title-sm text-title-sm transition-all flex items-center gap-1 shadow-sm"
                          >
                            <span className="material-symbols-outlined text-[16px]">groups</span>
                            <span>Hội Chẩn</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 2. Weekly Schedule Matrix */}
            <section className="bg-surface-clean rounded-2xl p-6 shadow-sm border border-surface-container/60 flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sapphire-dispatch text-[22px]">
                      calendar_view_week
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                      Ma Trận Lịch Trực Tuần Hội Đồng
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Phân bố ca trực lâm sàng: Sáng (07:00 - 13:00) • Chiều (13:00 - 19:00) • Đêm Cấp Cứu
                    (19:00 - 07:00)
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setWeekOffset(weekOffset - 1)}
                    className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center hover:bg-surface-container-high text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <span className="font-label-md text-label-md font-bold px-3 text-primary">
                    Tuần {42 + weekOffset} (21/10 - 27/10/2026)
                  </span>
                  <button
                    onClick={() => setWeekOffset(weekOffset + 1)}
                    className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center hover:bg-surface-container-high text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                  <button
                    onClick={() =>
                      onShowToast(
                        'Xuất Báo Cáo PDF',
                        `Đang tải xuống lịch trực Hội Đồng Y Khoa tuần ${42 + weekOffset} định dạng PDF.`
                      )
                    }
                    className="ml-2 h-8 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md flex items-center gap-1 border border-surface-container"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span>Xuất PDF</span>
                  </button>
                </div>
              </div>

              {/* Schedule Matrix Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                      <th className="p-3 font-bold rounded-l-lg">Bác Sĩ / Chức Danh</th>
                      <th className="p-3 text-center">T2 <span className="block font-normal text-[10px]">21/10</span></th>
                      <th className="p-3 text-center">T3 <span className="block font-normal text-[10px]">22/10</span></th>
                      <th className="p-3 text-center bg-primary-fixed/30 text-primary font-bold">
                        T4 (Hôm nay)<span className="block font-normal text-[10px]">23/10</span>
                      </th>
                      <th className="p-3 text-center">T5 <span className="block font-normal text-[10px]">24/10</span></th>
                      <th className="p-3 text-center">T6 <span className="block font-normal text-[10px]">25/10</span></th>
                      <th className="p-3 text-center">T7 <span className="block font-normal text-[10px]">26/10</span></th>
                      <th className="p-3 text-center rounded-r-lg">CN <span className="block font-normal text-[10px]">27/10</span></th>
                    </tr>
                  </thead>
                  <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-surface-container-low">
                    {/* Row 1 */}
                    <tr className="hover:bg-surface-bright transition-colors">
                      <td className="p-3 font-semibold">
                        <div className="font-title-sm text-title-sm text-primary">PGS.TS Trần Vinh Quang</div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Tim Mạch Can Thiệp</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shadow-xs">Sáng</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                      <td className="p-2 text-center bg-primary-fixed/20">
                        <span className="inline-block px-2 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-xs">Sáng + HC</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-error-container text-emergency-red font-label-sm text-label-sm font-bold">Đêm C/C</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">Hội đồng</span>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="hover:bg-surface-bright transition-colors">
                      <td className="p-3 font-semibold">
                        <div className="font-title-sm text-title-sm text-primary">TS.BS Lê Hồng Hùng</div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Lão Khoa &amp; Thần Kinh</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">Chiều</span>
                      </td>
                      <td className="p-2 text-center bg-primary-fixed/20">
                        <span className="inline-block px-2 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">Hội Chẩn</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">Chiều</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-error-container text-emergency-red font-label-sm text-label-sm font-bold">Đêm C/C</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="hover:bg-surface-bright transition-colors">
                      <td className="p-3 font-semibold">
                        <div className="font-title-sm text-title-sm text-primary">BSCKII Vũ Thị Mai</div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Hồi Sức Cấp Cứu ICU</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-error-container text-emergency-red font-label-sm text-label-sm font-bold">Đêm C/C</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                      <td className="p-2 text-center bg-primary-fixed/20">
                        <span className="inline-block px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">Sáng (ICU)</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-error-container text-emergency-red font-label-sm text-label-sm font-bold">Đêm C/C</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">Sáng</span>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr className="hover:bg-surface-bright transition-colors">
                      <td className="p-3 font-semibold">
                        <div className="font-title-sm text-title-sm text-primary">ThS.BS Lê Hoàng Long</div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Nội Tiết &amp; Giảm Nhẹ</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">Sáng</span>
                      </td>
                      <td className="p-2 text-center bg-primary-fixed/20 text-outline-variant font-body-sm">—</td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">Sáng</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">Chiều</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">Sáng</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                    </tr>

                    {/* Row 5 */}
                    <tr className="hover:bg-surface-bright transition-colors">
                      <td className="p-3 font-semibold">
                        <div className="font-title-sm text-title-sm text-primary">BS. Huỳnh Mai</div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Điều Phối 115 GPS</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">Chiều</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-error-container text-emergency-red font-label-sm text-label-sm font-bold">Đêm C/C</span>
                      </td>
                      <td className="p-2 text-center bg-primary-fixed/20">
                        <span className="inline-block px-2 py-1 rounded bg-error-container text-emergency-red font-label-sm text-label-sm font-bold animate-pulse">Trực 115</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">Chiều</span>
                      </td>
                      <td className="p-2 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-error-container text-emergency-red font-label-sm text-label-sm font-bold">Đêm C/C</span>
                      </td>
                      <td className="p-2 text-center text-outline-variant font-body-sm">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Legend Bar */}
              <div className="mt-4 pt-3 flex flex-wrap items-center gap-4 font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low p-3 rounded-xl border border-surface-container/50">
                <span className="font-bold text-on-surface">Chú thích ca:</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-primary-container"></span> Ca Sáng (07:00 - 13:00)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-secondary-fixed"></span> Ca Chiều (13:00 - 19:00)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-error-container"></span> Trực Đêm Cấp Cứu (19:00 - 07:00)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-tertiary-fixed"></span> Hội Chẩn Chuyên Gia Đột Xuất
                </span>
              </div>
            </section>
          </div>

          {/* Right Column: Form Thêm Bác Sĩ Mới Vào Hội Đồng */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Add Doctor Form Section */}
            <section className="bg-surface-clean rounded-2xl p-6 shadow-sm border border-surface-container/60 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-deep text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                </div>
                <div>
                  <h3 className="font-title-lg text-title-lg text-primary font-bold">Thêm Bác Sĩ Mới</h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Đăng ký vào Hội Đồng Cố Vấn Y Khoa
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreateDoctor} className="flex flex-col gap-4">
                {/* Full Name */}
                <div>
                  <label className="block font-label-md text-label-md font-bold text-on-surface mb-1">
                    Họ và Tên Bác Sĩ <span className="text-emergency-red">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Anh Tuấn"
                      className="w-full h-11 px-3 pl-9 rounded-lg bg-surface border border-outline-variant text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-on-surface-variant text-[18px]">
                      person
                    </span>
                  </div>
                </div>

                {/* Degree & Title */}
                <div>
                  <label className="block font-label-md text-label-md font-bold text-on-surface mb-1">
                    Học Hàm / Học Vị <span className="text-emergency-red">*</span>
                  </label>
                  <select
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-surface border border-outline-variant text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="">-- Chọn học vị --</option>
                    <option value="GS.TS">Giáo Sư, Tiến Sĩ (GS.TS)</option>
                    <option value="PGS.TS">Phó Giáo Sư, Tiến Sĩ (PGS.TS)</option>
                    <option value="TS.BS">Tiến Sĩ, Bác Sĩ (TS.BS)</option>
                    <option value="BSCKII">Bác Sĩ Chuyên Khoa II (BSCKII)</option>
                    <option value="ThS.BS">Thạc Sĩ, Bác Sĩ (ThS.BS)</option>
                    <option value="BSCKI">Bác Sĩ Chuyên Khoa I (BSCKI)</option>
                  </select>
                </div>

                {/* Specialty */}
                <div>
                  <label className="block font-label-md text-label-md font-bold text-on-surface mb-1">
                    Chuyên Khoa Cố Vấn <span className="text-emergency-red">*</span>
                  </label>
                  <select
                    required
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-surface border border-outline-variant text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="">-- Chọn chuyên khoa --</option>
                    <option value="Tim Mạch Can Thiệp">Tim Mạch Can Thiệp</option>
                    <option value="Lão Khoa & Sa Sút Trí Tuệ">Lão Khoa &amp; Sa Sút Trí Tuệ</option>
                    <option value="Hồi Sức Tích Cực (ICU)">Hồi Sức Tích Cực (ICU)</option>
                    <option value="Nội Tiết & Chuyển Hoá">Nội Tiết &amp; Chuyển Hoá</option>
                    <option value="Cấp Cứu Ngoại Viện & Telehealth">Cấp Cứu Ngoại Viện &amp; Telehealth</option>
                    <option value="Chấn Thương Chỉnh Hình Lão Khoa">Chấn Thương Chỉnh Hình Lão Khoa</option>
                    <option value="Ung Bướu & Chăm Sóc Giảm Nhẹ">Ung Bướu &amp; Chăm Sóc Giảm Nhẹ</option>
                  </select>
                </div>

                {/* Medical License Number */}
                <div>
                  <label className="block font-label-md text-label-md font-bold text-on-surface mb-1">
                    Số Chứng Chỉ Hành Nghề (CCHN) <span className="text-emergency-red">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={license}
                      onChange={(e) => setLicense(e.target.value.toUpperCase())}
                      placeholder="019283/BYT-CCHN"
                      className="w-full h-11 px-3 pl-9 rounded-lg bg-surface border border-outline-variant text-on-surface font-body-md text-body-md focus:bg-surface-clean focus:outline-none focus:ring-2 focus:ring-primary uppercase transition-all"
                    />
                    <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-on-surface-variant text-[18px]">
                      verified
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 block">
                    Tự động liên thông xác thực cơ sở dữ liệu Bộ Y Tế
                  </span>
                </div>

                {/* Shift Registration */}
                <div>
                  <label className="block font-label-md text-label-md font-bold text-on-surface mb-1">
                    Ca Trực Đăng Ký Cố Vấn <span className="text-emergency-red">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <label className="flex items-center gap-1.5 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-all">
                      <input
                        type="checkbox"
                        checked={shifts.sang}
                        onChange={(e) => setShifts({ ...shifts, sang: e.target.checked })}
                        className="w-4 h-4 rounded text-primary focus:ring-0"
                      />
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">Ca Sáng</span>
                    </label>

                    <label className="flex items-center gap-1.5 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-all">
                      <input
                        type="checkbox"
                        checked={shifts.chieu}
                        onChange={(e) => setShifts({ ...shifts, chieu: e.target.checked })}
                        className="w-4 h-4 rounded text-primary focus:ring-0"
                      />
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">Ca Chiều</span>
                    </label>

                    <label className="flex items-center gap-1.5 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-all">
                      <input
                        type="checkbox"
                        checked={shifts.dem}
                        onChange={(e) => setShifts({ ...shifts, dem: e.target.checked })}
                        className="w-4 h-4 rounded text-primary focus:ring-0"
                      />
                      <span className="font-label-sm text-label-sm font-bold text-emergency-red">Đêm C/C</span>
                    </label>
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block font-label-md text-label-md font-bold text-on-surface mb-1">
                    Tải Lên Hồ Sơ / CV Thẩm Định
                  </label>
                  <div className="p-3 rounded-lg bg-surface-container-low border-dashed border-2 border-outline-variant flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-high transition-all">
                    <span className="material-symbols-outlined text-[24px] text-primary">upload_file</span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface mt-1">
                      Chọn file PDF bằng cấp y khoa
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Tối đa 15MB (.PDF, .ZIP)
                    </span>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-emerald-deep hover:bg-primary text-on-primary font-title-sm text-title-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all mt-1"
                >
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  <span>Xác Nhận Lưu Vào Hội Đồng</span>
                </button>

                {/* Success Alert */}
                {showSuccessNotice && (
                  <div className="p-3 rounded-xl bg-vital-stable/10 text-vital-stable font-label-md text-label-md flex items-center gap-2 animate-in fade-in">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Đã tiếp nhận hồ sơ vào danh sách xét duyệt của Hội đồng!</span>
                  </div>
                )}
              </form>
            </section>

            {/* Quick Access: Clinical Board Guidelines */}
            <div className="bg-surface-clean rounded-2xl p-6 shadow-sm border border-surface-container/60">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-clinical-amber text-[20px]">policy</span>
                <h4 className="font-title-sm text-title-sm font-bold text-on-surface">
                  Quy Chế Hội Chẩn Đột Xuất
                </h4>
              </div>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-vital-stable shrink-0 mt-0.5">
                    check
                  </span>
                  <span>Túc trực cấp 1 có mặt trong vòng 5 phút khi kích hoạt Báo Động Đỏ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-vital-stable shrink-0 mt-0.5">
                    check
                  </span>
                  <span>
                    Hội đồng phê duyệt phác đồ đa mô thức phải có ít nhất 02 chuyên gia hàm PGS/TS ký duyệt số.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-vital-stable shrink-0 mt-0.5">
                    check
                  </span>
                  <span>Bảo mật dữ liệu hội chẩn Telehealth tuân thủ cấp độ HIPAA &amp; HL7 FHIR.</span>
                </li>
              </ul>
              <div className="mt-4 pt-2 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() =>
                    onShowToast(
                      'Sổ Tay Vận Hành Y Khoa 2026',
                      'Đang mở tài liệu tiêu chuẩn quy chế hội đồng y khoa JCI & HL7 FHIR.'
                    )
                  }
                  className="font-label-md text-label-md text-primary font-bold flex items-center gap-1 hover:underline"
                >
                  <span>Xem Sổ Tay Vận Hành Y Khoa 2026</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
