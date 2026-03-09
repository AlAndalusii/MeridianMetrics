"use client"

import React from "react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"

// ─── Checklist data ────────────────────────────────────────────────────────────
const checklistItems = [
  { q: "Do you have a separate clinical waste bin for hazardous clinical waste (yellow bags/bins)?",   risk: "HIGH" },
  { q: "Is clinical waste collected by an Environment Agency-licensed clinical waste contractor?",       risk: "HIGH" },
  { q: "Do you hold a current signed duty of care waste transfer note for each waste stream?",          risk: "HIGH" },
  { q: "Is your clinical waste contractor's EA licence number recorded on file?",                       risk: "HIGH" },
  { q: "Do you have a separate food waste bin with a minimum weekly collection?",                       risk: "HIGH" },
  { q: "Do you have a dry recycling bin for plastic, tins, and glass?",                                risk: "HIGH" },
  { q: "Do you have a separate bin for paper and cardboard?",                                           risk: "HIGH" },
  { q: "Have all care staff received written waste segregation instructions?",                           risk: "HIGH" },
  { q: "Is a written Waste Management Plan in place at the facility?",                                  risk: "HIGH" },
  { q: "Is clinical and hazardous waste stored in a secure, locked area away from general waste?",      risk: "HIGH" },
  { q: "Are all clinical waste bins colour-coded and labelled in line with HTM 07-01?",                 risk: "MED"  },
  { q: "Are bin areas accessible to collection vehicles on scheduled collection days?",                  risk: "MED"  },
  { q: "Do you retain all waste collection manifests, consignment notes, and receipts?",                risk: "MED"  },
  { q: "Is food waste stored in a sealed caddy to prevent pests and cross-contamination?",              risk: "MED"  },
  { q: "Are waste segregation instructions displayed in all clinical and domestic areas?",               risk: "MED"  },
  { q: "Is there a documented procedure for confidential and sensitive document disposal?",              risk: "MED"  },
]

export default function CareHomeChecklistPrintPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print()
  }

  return (
    <>
      {/* ── Print styles ──────────────────────────────────────────────────── */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 12mm 14mm;
        }

        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-page { box-shadow: none !important; border: none !important; }
        }

        @media screen {
          body { background: #f1f5f9; }
        }

        * { box-sizing: border-box; }

        .print-page {
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          background: white;
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          padding: 0;
          box-shadow: 0 4px 40px rgba(0,0,0,0.15);
        }

        /* Header */
        .pdf-header {
          background: linear-gradient(135deg, #1C2B3A 0%, #1a3340 100%);
          padding: 18px 22px 16px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }
        .pdf-header-left { flex: 1; min-width: 0; }
        .pdf-header-tag {
          display: inline-block;
          background: rgba(244,63,94,0.18);
          border: 1px solid rgba(244,63,94,0.35);
          color: #fda4af;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 20px;
          margin-bottom: 7px;
        }
        .pdf-title {
          color: #ffffff;
          font-size: 19px;
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 4px;
          letter-spacing: -0.3px;
        }
        .pdf-title span { color: #6ee7b7; }
        .pdf-subtitle {
          color: rgba(255,255,255,0.5);
          font-size: 9px;
          font-weight: 400;
          margin: 0;
          line-height: 1.5;
        }
        .pdf-logo-box {
          flex-shrink: 0;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Alert */
        .pdf-alert {
          background: #fff1f2;
          border-left: 3px solid #ef4444;
          padding: 9px 14px;
          margin: 12px 14px 0;
          border-radius: 0 6px 6px 0;
        }
        .pdf-alert-title {
          color: #991b1b;
          font-size: 9px;
          font-weight: 700;
          margin: 0 0 3px;
        }
        .pdf-alert-body {
          color: #b91c1c;
          font-size: 8.5px;
          font-weight: 400;
          margin: 0;
          line-height: 1.5;
        }

        /* Checklist table */
        .pdf-table { margin: 10px 14px 0; }
        .pdf-table-header {
          display: grid;
          grid-template-columns: 20px 1fr 56px 48px;
          gap: 6px;
          padding: 5px 10px;
          background: #1C2B3A;
          border-radius: 6px 6px 0 0;
          align-items: center;
        }
        .pdf-table-header span {
          color: #6ee7b7;
          font-size: 7.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .pdf-table-header .th-risk { text-align: center; }
        .pdf-table-header .th-yn   { text-align: center; }

        .pdf-row {
          display: grid;
          grid-template-columns: 20px 1fr 56px 48px;
          gap: 6px;
          padding: 6px 10px;
          align-items: center;
          border-bottom: 1px solid #f0fdf4;
        }
        .pdf-row:nth-child(even) { background: #f8fafc; }
        .pdf-row:nth-child(odd)  { background: #ffffff; }
        .pdf-row:last-child { border-bottom: none; border-radius: 0 0 6px 6px; }

        .pdf-row-num {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #d1fae5;
          color: #065f46;
          font-size: 8px;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pdf-row-q {
          color: #334155;
          font-size: 8.5px;
          font-weight: 400;
          line-height: 1.45;
        }
        .pdf-risk-high {
          background: #dc2626;
          color: #ffffff;
          font-size: 7.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 2px 5px;
          border-radius: 4px;
          text-align: center;
          white-space: nowrap;
        }
        .pdf-risk-med {
          background: #d97706;
          color: #ffffff;
          font-size: 7.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 2px 5px;
          border-radius: 4px;
          text-align: center;
          white-space: nowrap;
        }
        .pdf-yn-box {
          width: 38px; height: 16px;
          border: 1.5px solid #cbd5e1;
          border-radius: 3px;
          margin: 0 auto;
          display: flex; align-items: center;
        }
        .pdf-yn-y, .pdf-yn-n {
          flex: 1; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 7px;
          font-weight: 700;
          color: #94a3b8;
        }
        .pdf-yn-divider {
          width: 1px; height: 100%;
          background: #cbd5e1;
        }

        /* Score bands */
        .pdf-score-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin: 8px 14px 0;
        }
        .pdf-score-card {
          border-radius: 6px;
          padding: 7px 9px;
          border-width: 1px;
          border-style: solid;
        }
        .pdf-score-card.green  { background: #f0fdf4; border-color: #bbf7d0; }
        .pdf-score-card.amber  { background: #fffbeb; border-color: #fde68a; }
        .pdf-score-card.red    { background: #fff1f2; border-color: #fecaca; }
        .pdf-score-label {
          font-size: 9px; font-weight: 800; margin: 0 0 2px;
        }
        .pdf-score-card.green  .pdf-score-label { color: #15803d; }
        .pdf-score-card.amber  .pdf-score-label { color: #b45309; }
        .pdf-score-card.red    .pdf-score-label { color: #dc2626; }
        .pdf-score-text {
          font-size: 7.5px; font-weight: 400; color: #64748b; margin: 0; line-height: 1.4;
        }

        /* Facility details */
        .pdf-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin: 8px 14px 0;
        }
        .pdf-field-label {
          font-size: 7px; font-weight: 700; color: #64748b;
          text-transform: uppercase; letter-spacing: 0.07em;
          margin: 0 0 3px;
        }
        .pdf-field-line {
          height: 20px;
          border-bottom: 1.5px solid #cbd5e1;
          width: 100%;
        }

        /* Footer */
        .pdf-footer {
          background: #1C2B3A;
          padding: 9px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
        }
        .pdf-footer-left { color: rgba(255,255,255,0.45); font-size: 7.5px; font-weight: 400; }
        .pdf-footer-left strong { color: rgba(255,255,255,0.75); font-weight: 600; }
        .pdf-footer-right { color: #6ee7b7; font-size: 7.5px; font-weight: 600; }
      `}</style>

      {/* ── Print button (screen only) ─────────────────────────────────────── */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-xl shadow-lg transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / Save as PDF
        </button>
        <a
          href="/resources/care-home-waste-compliance-checklist"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl shadow-sm hover:bg-slate-50 transition-all"
        >
          ← Back
        </a>
      </div>

      {/* ── A4 Page ─────────────────────────────────────────────────────────── */}
      <div className="print-page">

        {/* Header */}
        <div className="pdf-header">
          <div className="pdf-header-left">
            <div className="pdf-header-tag">Care Home Edition · Simpler Recycling + HTM 07-01</div>
            <h1 className="pdf-title">
              Care Home Waste<br />
              <span>Compliance Checklist</span>
            </h1>
            <p className="pdf-subtitle">
              Self-audit checklist · 16 questions · Print, walk your facility, and tick every box<br />
              Any NO answer must be actioned before your next CQC or Environment Agency inspection
            </p>
          </div>
          <div className="pdf-logo-box">
            <MillstoneLogo size="sm" variant="modern" />
          </div>
        </div>

        {/* Alert */}
        <div className="pdf-alert">
          <p className="pdf-alert-title">⚠ Since 31 March 2026 — care home managers are personally accountable for waste compliance</p>
          <p className="pdf-alert-body">
            CQC and the Environment Agency both inspect care home waste management. Tick YES only when you have written evidence. Any NO = immediate action required.
          </p>
        </div>

        {/* Checklist table */}
        <div className="pdf-table">
          <div className="pdf-table-header">
            <span>#</span>
            <span>Compliance Question</span>
            <span className="th-risk">Risk Level</span>
            <span className="th-yn">Y / N</span>
          </div>
          {checklistItems.map(({ q, risk }, i) => (
            <div key={i} className="pdf-row">
              <div className="pdf-row-num">{i + 1}</div>
              <p className="pdf-row-q">{q}</p>
              <div className={risk === "HIGH" ? "pdf-risk-high" : "pdf-risk-med"}>
                {risk === "HIGH" ? "HIGH RISK" : "MED RISK"}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="pdf-yn-box">
                  <div className="pdf-yn-y">Y</div>
                  <div className="pdf-yn-divider" />
                  <div className="pdf-yn-n">N</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Score bands */}
        <div className="pdf-score-row">
          <div className="pdf-score-card green">
            <p className="pdf-score-label">0 NOs — Compliant</p>
            <p className="pdf-score-text">Document your evidence and keep records on file for inspection.</p>
          </div>
          <div className="pdf-score-card amber">
            <p className="pdf-score-label">1–3 NOs — Review Needed</p>
            <p className="pdf-score-text">Fix all HIGH RISK gaps this week. Address MED RISK within 30 days.</p>
          </div>
          <div className="pdf-score-card red">
            <p className="pdf-score-label">4+ NOs — Book an Audit</p>
            <p className="pdf-score-text">Contact Millstone Compliance immediately for a full written assessment.</p>
          </div>
        </div>

        {/* Facility details */}
        <div style={{ margin: "10px 14px 0", borderTop: "1px solid #e2e8f0", paddingTop: "8px" }}>
          <p style={{ fontSize: "7.5px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px" }}>
            Facility Details — Complete Before Inspection
          </p>
          <div className="pdf-fields">
            <div>
              <p className="pdf-field-label">Facility Name</p>
              <div className="pdf-field-line" />
            </div>
            <div>
              <p className="pdf-field-label">Address</p>
              <div className="pdf-field-line" />
            </div>
            <div>
              <p className="pdf-field-label">Registered Manager</p>
              <div className="pdf-field-line" />
            </div>
            <div>
              <p className="pdf-field-label">Date of Self-Audit</p>
              <div className="pdf-field-line" />
            </div>
            <div>
              <p className="pdf-field-label">Clinical Waste Contractor</p>
              <div className="pdf-field-line" />
            </div>
            <div>
              <p className="pdf-field-label">EA Licence Number</p>
              <div className="pdf-field-line" />
            </div>
          </div>
        </div>

        {/* Regulatory references */}
        <div style={{ margin: "8px 14px 0", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "7px 10px" }}>
          <p style={{ fontSize: "7.5px", fontWeight: 700, color: "#334155", margin: "0 0 4px" }}>Regulatory References</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 12px" }}>
            {[
              "Environmental Protection Act 1990 — Duty of Care",
              "Simpler Recycling Regulations (effective March 2026)",
              "HTM 07-01 — Safe Management of Healthcare Waste",
              "Environmental Permitting (England & Wales) Regulations 2016",
              "Hazardous Waste (England & Wales) Regulations 2005",
              "CQC Key Lines of Enquiry — Safe Care Delivery",
            ].map((ref) => (
              <p key={ref} style={{ fontSize: "7px", color: "#64748b", margin: "0", lineHeight: "1.5" }}>• {ref}</p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pdf-footer">
          <div className="pdf-footer-left">
            <strong>Millstone Compliance Ltd</strong> · hello@millstonecompliance.com · 0121 751 2262<br />
            millstonecompliance.com · Full care home audits from £295 · Updated March 2026
          </div>
          <div className="pdf-footer-right">millstonecompliance.com/resources</div>
        </div>

      </div>
    </>
  )
}
