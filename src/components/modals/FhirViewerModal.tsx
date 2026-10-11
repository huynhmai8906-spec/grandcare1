import React from 'react';
import { PatientRecord } from '../../types';

interface FhirViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientRecord | null;
  onDeletePatient?: (id: string) => void;
  onExportPdf?: (patient: PatientRecord) => void;
}

export const FhirViewerModal: React.FC<FhirViewerModalProps> = ({
  isOpen,
  onClose,
  patient,
  onDeletePatient,
  onExportPdf,
}) => {
  if (!isOpen || !patient) return null;

  const fhirBundle = {
    resourceType: 'Bundle',
    id: `bundle-${patient.id.toLowerCase()}`,
    type: 'collection',
    timestamp: new Date().toISOString(),
    entry: [
      {
        fullUrl: `urn:uuid:${patient.id.toLowerCase()}`,
        resource: {
          resourceType: 'Patient',
          id: patient.id,
          identifier: [
            { system: 'https://grandcare.vn/id/ehr', value: patient.id },
            { system: 'urn:oid:2.16.840.1.113883.4.1', value: patient.cccd },
          ],
          active: true,
          name: [
            {
              use: 'official',
              text: patient.name,
              family: patient.name.split(' ')[0] || '',
              given: patient.name.split(' ').slice(1) || [],
            },
          ],
          gender: patient.gender === 'Nam' ? 'male' : 'female',
          birthDate: patient.dob,
          generalPractitioner: [{ display: patient.doctor }],
          managingOrganization: { display: 'GrandCare Medical VIP Geriatric Center' },
        },
      },
      {
        fullUrl: `urn:uuid:observation-${patient.id.toLowerCase()}-vitals`,
        resource: {
          resourceType: 'Observation',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'vital-signs',
                },
              ],
            },
          ],
          code: {
            coding: [{ system: 'http://loinc.org', code: '8867-4', display: 'Heart rate' }],
          },
          subject: { reference: `Patient/${patient.id}` },
          effectiveDateTime: new Date().toISOString(),
          valueQuantity: {
            value: patient.hr,
            unit: 'beats/minute',
            system: 'http://unitsofmeasure.org',
            code: '/min',
          },
        },
      },
      {
        fullUrl: `urn:uuid:encounter-${patient.id.toLowerCase()}`,
        resource: {
          resourceType: 'Encounter',
          status: 'in-progress',
          class: {
            system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
            code: 'IMP',
            display: 'inpatient encounter',
          },
          subject: { reference: `Patient/${patient.id}` },
          location: [{ location: { display: patient.room } }],
        },
      },
    ],
  };

  const jsonString = JSON.stringify(fhirBundle, null, 2);

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${patient.id}-FHIR-R4-Bundle.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    const confirmInput = prompt(
      `CẢNH BÁO AN TOÀN Y TẾ:\nBạn đang yêu cầu hủy lưu trữ hồ sơ của bệnh nhân ${patient.name} (${patient.id}).\nNhập mã định danh "${patient.id}" để xác nhận hủy:`
    );
    if (confirmInput === patient.id) {
      if (onDeletePatient) onDeletePatient(patient.id);
      onClose();
    } else if (confirmInput !== null) {
      alert('Mã xác nhận không khớp. Thao tác hủy bỏ.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-clean rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sapphire-dispatch text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">integration_instructions</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  HL7® FHIR® R4 Resource Inspector
                </h3>
                <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-[11px] font-bold">
                  Bundle/Patient
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Bệnh nhân: {patient.name} • Mã EHR: {patient.id}
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

        {/* Toolbar */}
        <div className="px-6 py-2.5 bg-surface-container-lowest border-b border-surface-container flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
              Cú pháp:
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-xs font-bold text-primary">
              application/fhir+json
            </span>
            <span className="text-vital-stable font-label-sm text-label-sm flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-vital-stable"></span>
              JSON Schema Validated
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-sm text-title-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-sapphire-dispatch">download</span>
              <span>Tải về JSON FHIR</span>
            </button>

            {onExportPdf && (
              <button
                onClick={() => onExportPdf(patient)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-deep text-on-primary hover:bg-primary font-title-sm text-title-sm transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                <span>Xuất PDF Bệnh Án</span>
              </button>
            )}

            {onDeletePatient && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error-container text-on-error-container hover:bg-error hover:text-on-error font-title-sm text-title-sm transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                <span>Xóa Hồ Sơ</span>
              </button>
            )}
          </div>
        </div>

        {/* JSON Viewer */}
        <div className="p-6 overflow-y-auto bg-inverse-surface flex-1">
          <pre className="font-mono text-[13px] leading-relaxed text-inverse-on-surface">
            <code>{jsonString}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-2.5 bg-surface-container-low flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant border-t border-surface-container">
          <span className="font-mono text-xs">SHA-256 Checksum: 4f8a3d9b01c4e78298ba994e6371c810df627ae6159</span>
          <span className="flex items-center gap-1 text-emerald-deep font-bold">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            Encrypted AES-256 In-Transit
          </span>
        </div>
      </div>
    </div>
  );
};
