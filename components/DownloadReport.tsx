"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';

interface Gap {
  title: string;
  description: string;
  exposure?: string;
}

interface DownloadReportProps {
  userName: string;
  userEmail: string;
  company: string;
  score: number;
  gaps: Gap[];
  strengths: string[];
  onDownload: () => void;
  isGenerating?: boolean;
}

export const DownloadReport: React.FC<DownloadReportProps> = ({
  userName,
  userEmail,
  company,
  score,
  gaps,
  strengths,
  onDownload,
  isGenerating = false,
}) => {
  const getScoreColor = () => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (score >= 50) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreLabel = () => {
    if (score >= 90) return "Audit-Ready - Excellent!";
    if (score >= 70) return "Strong Foundation - Nearly There";
    if (score >= 50) return "Compliance Risk - Action Needed";
    return "Critical Gaps - Urgent Attention Required";
  };

  return (
    <div id="assessment-report" className="w-full max-w-4xl mx-auto">
      {/* Report Preview Card */}
      <div className="bg-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.08)]">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 pb-6 border-b border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="poppins-bold text-2xl sm:text-3xl text-emerald-900 mb-2">
                Your Compliance Report
              </h2>
              <p className="poppins-regular text-sm sm:text-base text-emerald-600">
                Prepared for {userName}
              </p>
            </div>
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
            </div>
          </div>
          
          <div className="bg-emerald-50/50 rounded-xl p-4">
            <p className="poppins-regular text-sm text-emerald-800 leading-relaxed">
              Dear {userName}, thank you for completing your PPT Compliance Assessment. 
              We've prepared this personalized report to help you understand where you stand 
              and what steps you can take to protect your business from HMRC penalties.
            </p>
          </div>
        </div>

        {/* Score Display */}
        <div className="mb-6 sm:mb-8">
          <h3 className="poppins-semibold text-lg sm:text-xl text-emerald-900 mb-4">
            Your Compliance Score
          </h3>
          <div className={`${getScoreColor()} rounded-2xl p-6 sm:p-8 border-2`}>
            <div className="flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl md:text-7xl poppins-bold mb-2">
                  {score}
                  <span className="text-3xl sm:text-4xl text-gray-500">/100</span>
                </div>
                <p className="poppins-semibold text-base sm:text-lg">
                  {getScoreLabel()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="poppins-medium text-sm text-amber-600 mb-1">Areas to Address</p>
                <p className="poppins-bold text-3xl text-amber-900">{gaps.length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="poppins-medium text-sm text-green-600 mb-1">Doing Well</p>
                <p className="poppins-bold text-3xl text-green-900">{strengths.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="pt-6 border-t border-emerald-100">
          <Button
            onClick={onDownload}
            disabled={isGenerating}
            className="poppins-semibold w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:shadow-xl hover:shadow-emerald-500/30 sm:hover:scale-105 active:scale-95 transition-all duration-300 py-5 sm:py-6 text-sm sm:text-base min-h-[54px] rounded-xl sm:rounded-2xl group relative overflow-hidden"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating Your Professional Report...
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                <Download className="w-5 h-5 mr-2 group-hover:translate-y-0.5 transition-transform" />
                <span className="relative z-10">Download Your Professional PDF Report</span>
              </>
            )}
          </Button>
          
          <div className="mt-4 text-center">
            <p className="poppins-regular text-xs sm:text-sm text-emerald-600">
              Get a beautifully designed, consultancy-grade PDF report with personalized recommendations
            </p>
          </div>
        </div>

        {/* Report Preview Note */}
        <div className="mt-6 bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
          <p className="poppins-medium text-sm text-emerald-800 mb-2">
            📄 Your PDF report includes:
          </p>
          <ul className="space-y-1 text-sm text-emerald-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Personalized welcome message and executive summary</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Detailed breakdown of all {gaps.length} compliance gaps</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Recognition of your {strengths.length} compliance strengths</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Tailored recommendations and next steps</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Professional formatting with Millstone Compliance branding</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DownloadReport;

