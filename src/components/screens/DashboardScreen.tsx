import React from 'react';
import { NavTab } from '../../types';

interface DashboardScreenProps {
  onNavigate: (tab: NavTab) => void;
  onOpenSos: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'alert') => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onOpenSos,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="p-6 lg:p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        {/* Hero Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-md flex flex-col lg:flex-row border border-surface-container/60">
          <div className="lg:w-7/12 relative min-h-[360px] lg:min-h-[460px] overflow-hidden group">
            <img
              alt="Sảnh chính Bệnh viện Quốc tế GrandCare"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHSGsrks7oPp7spM0_5ss64YmVOipRdx_iSaA72ryBHOT8B_Bq2THYVNQvi6-Mb9oY2ba1xXdBXMrGjUSXvJ8F5cc1uyJlp1FNfMQgSj90vzwIfHitOdioyokn2tHFvljTn4pzgPvOOrLN5yIdPsxrx7r1FOxzQdZx3iwfdEt-oVujaJFSZpNv22hAgk7Oucxkohlo5C3-aBI2GuleBLchsqkCKaD8IlQ8OD0r_Oe3E-16pHjxXem6"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-primary/80 via-primary/30 to-transparent"></div>

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-clean/90 text-primary font-label-md text-label-md shadow-sm backdrop-blur-md">
                <span className="material-symbols-outlined text-[16px] text-vital-stable">
                  verified
                </span>
                Tiêu Chuẩn Vàng JCI
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-clean/90 text-clinical-amber font-label-md text-label-md shadow-sm backdrop-blur-md">
                <span className="material-symbols-outlined text-[16px]">stars</span>
                Geriatric Care Excellence
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
              <div className="font-headline-sm text-headline-sm text-white drop-shadow-sm font-semibold">
                Tổ Hợp Y Tế Quốc Tế &amp; Nghỉ Dưỡng Lão Khoa GrandCare
              </div>
              <p className="font-body-sm text-body-sm text-white/90 mt-1">
                Nơi chuẩn mực y khoa lâm sàng thế giới kết hợp không gian trị liệu 5 sao.
              </p>
            </div>
          </div>

          <div className="lg:w-5/12 p-6 lg:p-8 flex flex-col justify-between bg-surface-clean">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 text-clinical-amber font-label-sm text-label-sm uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-[16px]">hotel_class</span>
                Clinical Sanctuary Quaternary Standard
              </div>
              <h1 className="hidden lg:block font-headline-lg text-headline-lg text-primary tracking-tight font-semibold leading-tight">
                Tổ Hợp Y Tế Quốc Tế &amp; Nghỉ Dưỡng Lão Khoa GrandCare
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Hệ sinh thái điều trị chuyên sâu thế hệ mới, kết hợp giám sát sinh hiệu liên tục qua giao
                thức HL7/FHIR R4 với chuẩn mực an dưỡng thượng lưu dành riêng cho người cao tuổi.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-6">
              <div
                onClick={() => onNavigate('rooms')}
                className="p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer flex flex-col justify-center"
              >
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[20px]">bedroom_parent</span>
                  <span className="font-headline-sm text-headline-sm font-bold">52</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Phòng Nghỉ Dưỡng VIP
                </span>
              </div>

              <div
                onClick={() => onNavigate('doctors')}
                className="p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer flex flex-col justify-center"
              >
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                  <span className="font-headline-sm text-headline-sm font-bold">12</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Giáo Sư, Bác Sĩ Đầu Ngành
                </span>
              </div>

              <div
                onClick={() => onNavigate('dispatch')}
                className="p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer flex flex-col justify-center"
              >
                <div className="flex items-center gap-1.5 text-emergency-red">
                  <span className="material-symbols-outlined text-[20px]">ambulance</span>
                  <span className="font-headline-sm text-headline-sm font-bold">3 Đội</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Mobile ICU Trực 24/7
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-vital-stable">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                  <span className="font-headline-sm text-headline-sm font-bold">99.4%</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Tỷ Lệ Thành Công
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-surface-container">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vital-stable opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-vital-stable"></span>
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                  Toàn Viện Ổn Định
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  onShowToast(
                    'Báo Cáo Toàn Viện 24h',
                    '52 buồng bệnh kết nối ổn định • 03 xe ICU sẵn sàng • 142 toa thuốc hoàn tất.'
                  )
                }
                className="px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-sm hover:bg-emerald-deep transition-colors inline-flex items-center gap-2"
              >
                <span>Báo Cáo Toàn Viện</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Visual Showcase Grid */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="font-label-sm text-label-sm text-clinical-amber uppercase tracking-wider font-semibold">
                Cơ Sở Vật Chất Y Khoa Đạt Chuẩn
              </span>
              <h2 className="font-headline-md text-headline-md text-primary mt-1">
                Không Gian Trị Liệu &amp; Năng Lực Cấp Cứu Thực Tế
              </h2>
            </div>
            <span className="font-body-md text-body-md text-on-surface-variant">
              Ảnh ghi nhận tại Viện Quốc Tế GrandCare cơ sở Trung Tâm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Area 1: Inpatient Suites */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-surface-container/60">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Phòng bệnh nội trú VIP view vườn sinh thái"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCslqAYiyWLCWhPLMsqHwjZraPb9HV2CfhGrwoqlw2ZHEL1x1W5Dn4ff_9DeSuOedNKv_uy-t6lC4_U25Eap44gvsa_KKtNi0QhXbUBCBWchV-NCrMaPMVopIEOSTfKbqijuzF7pylcSYOBokeq4mU_zBH6C5ziT8pJCfeDaDyYFYpcCweH0ZP9pv5LITWVfXaQUHGxULHUM0j17j7EcZoHF3RTXH6_tQAPGLvxlAQ_TGpKRys8-85U"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-surface-clean/90 font-label-sm text-label-sm text-primary font-bold">
                  Khu Nghỉ Dưỡng VIP
                </span>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="font-title-md text-title-md text-white font-bold block">
                    Phòng VIP Sen Vàng &amp; Bạch Đằng
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Khu Phòng VIP Sen Vàng &amp; Premier Bạch Đằng - Giường thông minh Hill-Rom, khí áp âm
                  HEPA lọc 99.9%, ban công sinh thái hướng hoa viên thanh tịnh.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-surface-container">
                  <span className="font-label-md text-label-md text-vital-stable font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span> 8 Phòng
                    Trống
                  </span>
                  <button
                    onClick={() => onNavigate('rooms')}
                    className="inline-flex items-center gap-1 text-primary hover:text-emerald-deep font-title-sm text-title-sm transition-colors"
                  >
                    <span>Xem Sơ Đồ Phòng</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Area 2: Grand Round Board */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-surface-container/60">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Hội đồng y khoa hội chẩn màn hình thông minh"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmBiSwuT3eXWIMBrXXhCEM22A8AvMQ5HhbR2_8ADZwRJTTDWsoCY_EBzAf0lWLrAL1Lx0OYmmPf09oBRzonmUvr6M6f1otAGQAUrEfLxBK1hQ3wTrUksDFwqLCXG2Z_XtIdJrVPxG0B6l8YMkVXXfBgmx070oB2L7pvnlcavUR7GSO-jIrxmiwkymemgII6zfrEmtFicwrkGAZhes3aE8J9iofNMzH97ztqkDXEN2TnuGW7fRyerRv"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-surface-clean/90 font-label-sm text-label-sm text-primary font-bold">
                  Hội Đồng Y Khoa
                </span>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="font-title-md text-title-md text-white font-bold block">
                    Hội Chẩn Grand Round Chuyên Sâu
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Hội đồng 12 Giáo Sư, Chuyên Gia Lâm Sàng - Hội đồng chẩn đoán đa chuyên khoa liên kết
                  Đại học Y Dược, hỗ trợ Telehealth hội chẩn quốc tế 24/7.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-surface-container">
                  <span className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">group</span> 12 Bác Sĩ
                    Trực Tuyến
                  </span>
                  <button
                    onClick={() => onNavigate('doctors')}
                    className="inline-flex items-center gap-1 text-primary hover:text-emerald-deep font-title-sm text-title-sm transition-colors"
                  >
                    <span>Xem Đội Ngũ Bác Sĩ</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Area 3: Mobile ICU */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-surface-container/60">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Bên trong xe cứu thương ICU tối tân cấp cứu"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3Pi9CT6ZxdzNGVLmzt3-8EndqMEHXjSbAC-pfU8cfGSTt7CdaC04Pgv-Oo2ITk0b0vKy0m1SwI-Hokbhr1hQw7tUMdxx9UwK5Pvz8OoKsWorOY8YLz83BJHZQg6E6ggFG3RS47X9RtOWjL0_fLY7N7fFvgIO_GZSvBztMQ2UZY14cN9d9iM04AmtfFNOvlUyOEh01eW6sRCq_fA8UzIefWATQsFEJJkjVy12BcrJHkRlUleuOH2-8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-surface-clean/90 font-label-sm text-label-sm text-emergency-red font-bold">
                  Cấp Cứu 115 Ngoại Viện
                </span>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="font-title-md text-title-md text-white font-bold block">
                    Mobile ICU &amp; ECMO Hiện Đại
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Đội Xe Cứu Thương Mercedes Sprinter Mobile ECMO - Tối ưu lộ trình thuật toán Dijkstra,
                  kết nối trực tiếp phòng mổ can thiệp mạch vành 24/7.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-surface-container">
                  <span className="font-label-md text-label-md text-emergency-red font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">fmd_good</span> GPS Sẵn
                    Sàng (3 Xe)
                  </span>
                  <button
                    onClick={() => onNavigate('dispatch')}
                    className="inline-flex items-center gap-1 text-primary hover:text-emerald-deep font-title-sm text-title-sm transition-colors"
                  >
                    <span>Xem Radar Cấp Cứu</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Clinical Pulse Dashboard */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[20px]">monitor_heart</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Nhịp Sống Lâm Sàng &amp; Hoạt Động Trực Tiếp (Live Clinical Pulse)
                </h2>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Cập nhật thời gian thực từ mạng lưới cảm biến buồng bệnh &amp; hệ thống EHR
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-vital-stable animate-pulse"></span>
              Đồng bộ FHIR 5 giây trước
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pulse 1: Room Occupancy */}
            <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col justify-between gap-4 border border-surface-container/60">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Tình Trạng Phòng Bệnh
                  </span>
                  <div className="font-title-lg text-title-lg text-on-surface mt-1 font-bold">
                    38 / 52 Phòng Đang Sử Dụng
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-surface-container-low text-primary font-label-sm text-label-sm font-bold">
                  Công Suất 73.1%
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden flex">
                  <div className="bg-primary h-full rounded-l-full" style={{ width: '73.1%' }}></div>
                  <div className="bg-vital-stable h-full" style={{ width: '15.4%' }}></div>
                  <div
                    className="bg-surface-container-highest h-full rounded-r-full"
                    style={{ width: '11.5%' }}
                  ></div>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant pt-1">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> 38 Đang lưu
                    trú
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-vital-stable inline-block"></span> 8 Sẵn
                    sàng
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-surface-variant inline-block"></span> 6 Khử
                    khuẩn
                  </span>
                </div>
              </div>

              <div
                onClick={onOpenSos}
                className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-vital-stable text-[18px]">
                    notifications_active
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                    2 Chuông SOS Đêm qua
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-vital-stable font-bold">
                  Đã xử lý dứt điểm (48s)
                </span>
              </div>
            </div>

            {/* Pulse 2: Key Surgeries & VIP Consultations */}
            <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col justify-between gap-4 border border-surface-container/60">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Hôm Nay: Lịch Khám &amp; Can Thiệp
                  </span>
                  <div className="font-title-lg text-title-lg text-on-surface mt-1 font-bold">
                    3 Lịch Can Thiệp Trọng Điểm
                  </div>
                </div>
                <span className="p-2 rounded-lg bg-surface-container-low text-primary">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="p-2.5 rounded-xl bg-surface-clean flex items-center justify-between border border-surface-container/50">
                  <div className="flex items-center gap-2.5">
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-primary-container text-on-primary font-bold">
                      10:30
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface leading-snug font-bold">
                        PGS.TS Trần Vinh Quang
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Tái tạo khớp háng Robot-Mako
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-clinical-amber font-semibold">
                    Phòng Mổ OR 01
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-surface-clean flex items-center justify-between border border-surface-container/50">
                  <div className="flex items-center gap-2.5">
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-bold">
                      14:00
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface leading-snug font-bold">
                        TS.BS Lê Hồng Hùng
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Hội chẩn Tim Mạch Lão Khoa VIP
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-vital-stable font-semibold">
                    Telehealth US
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-surface-clean flex items-center justify-between border border-surface-container/50">
                  <div className="flex items-center gap-2.5">
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-bold">
                      16:15
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface leading-snug font-bold">
                        BS.CKII Vũ Thùy Linh
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Đánh giá Trí Nhớ &amp; Alzheimer
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    Phòng Khám 204
                  </span>
                </div>
              </div>
            </div>

            {/* Pulse 3: Pharmacy Logistics */}
            <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col justify-between gap-4 border border-surface-container/60">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Chuỗi Cung Ứng Dược Lâm Sàng
                  </span>
                  <div className="font-title-lg text-title-lg text-on-surface mt-1 font-bold">
                    Hệ Thống Dược Chuẩn JCI
                  </div>
                </div>
                <span className="p-2 rounded-lg bg-surface-container-low text-primary">
                  <span className="material-symbols-outlined text-[20px]">medication_liquid</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => onNavigate('pharmacy')}
                  className="p-3.5 rounded-xl bg-surface-clean flex flex-col border border-surface-container/50 cursor-pointer hover:bg-surface-container-low transition-colors"
                >
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Đơn Hoàn Tất Hôm Nay
                  </span>
                  <span className="font-headline-sm text-headline-sm text-vital-stable font-bold">
                    142
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Liên kết Kho Trung Tâm
                  </span>
                </div>

                <div
                  onClick={() => onNavigate('pharmacy')}
                  className="p-3.5 rounded-xl bg-surface-clean flex flex-col border border-surface-container/50 cursor-pointer hover:bg-surface-container-low transition-colors"
                >
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Đơn Hỏa Tốc Lưu Viện
                  </span>
                  <span className="font-headline-sm text-headline-sm text-emergency-red font-bold">
                    18
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Đang giao nội viện &lt;10p
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-clinical-amber text-[18px]">
                    verified_user
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">
                    Tương tác thuốc tương thích:
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-vital-stable font-bold">
                  100% Không Xung Đột
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Hub (6 Core Modules) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-clinical-amber uppercase tracking-wider font-semibold">
                Trung Tâm Điều Hành 1-Chạm
              </span>
              <h2 className="font-headline-sm text-headline-sm text-primary mt-0.5 font-bold">
                Truy Cập Nhanh Phân Hệ Quản Trị Y Khoa
              </h2>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Tối ưu thao tác ca trực viện trưởng &amp; điều dưỡng trưởng
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Module 1: Patient EHR */}
            <button
              onClick={() => onNavigate('ehr')}
              className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all flex flex-col items-center text-center gap-3 border border-surface-container/60 group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">clinical_notes</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Hồ Sơ EHR
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Bệnh Án Điện Tử
                </span>
              </div>
            </button>

            {/* Module 2: Pharmacy */}
            <button
              onClick={() => onNavigate('pharmacy')}
              className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all flex flex-col items-center text-center gap-3 border border-surface-container/60 group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">medication</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Kho Dược Phẩm
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Kê Toa &amp; Xuất Thuốc
                </span>
              </div>
            </button>

            {/* Module 3: Doctors */}
            <button
              onClick={() => onNavigate('doctors')}
              className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all flex flex-col items-center text-center gap-3 border border-surface-container/60 group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">badge</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Bác Sĩ Trực Ban
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Hội Đồng Y Khoa
                </span>
              </div>
            </button>

            {/* Module 4: Telehealth */}
            <button
              onClick={() => onNavigate('telehealth')}
              className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all flex flex-col items-center text-center gap-3 border border-surface-container/60 group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-telehealth-teal group-hover:bg-telehealth-teal group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">video_camera_front</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Telehealth 24/7
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Khám Từ Xa &amp; Hội Chẩn
                </span>
              </div>
            </button>

            {/* Module 5: Room Grid */}
            <button
              onClick={() => onNavigate('rooms')}
              className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all flex flex-col items-center text-center gap-3 border border-surface-container/60 group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">single_bed</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Sơ Đồ Phòng
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Giường Bệnh &amp; Buồng VIP
                </span>
              </div>
            </button>

            {/* Module 6: Emergency 115 */}
            <button
              onClick={() => onNavigate('dispatch')}
              className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all flex flex-col items-center text-center gap-3 border border-surface-container/60 group"
            >
              <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center text-emergency-red group-hover:bg-emergency-red group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">emergency</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-emergency-red font-bold">
                  Cấp Cứu 115
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Dijkstra GPS Điều Phối
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Live Ambient Vitals & Environmental Monitor Footer */}
        <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4 border border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-clean flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[20px]">air</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-sm text-title-sm text-on-surface font-bold">
                Chỉ Số Môi Trường Khu Nghỉ Dưỡng
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Không khí sạch chuẩn ISO Class 5 • Nhiệt độ phòng ổn định 23.5°C • Độ ẩm 52%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-vital-stable font-bold uppercase tracking-wider bg-surface-clean px-3 py-1.5 rounded-full shadow-sm">
              Chuẩn Sanctuary Hoàn Hảo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
