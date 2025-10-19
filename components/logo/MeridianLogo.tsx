import React from 'react'

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'full' | 'icon' | 'horizontal' | 'minimal' | 'modern' | 'modern-icon'
  className?: string
  showText?: boolean
}

const sizeClasses = {
  sm: 'w-8 h-8 sm:w-10 sm:h-10',
  md: 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16',
  lg: 'w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20',
  xl: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
  '2xl': 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36'
}

const textSizeClasses = {
  sm: 'text-sm sm:text-base md:text-lg lg:text-xl',
  md: 'text-xl sm:text-2xl md:text-3xl',
  lg: 'text-2xl sm:text-3xl md:text-4xl',
  xl: 'text-3xl sm:text-4xl md:text-5xl',
  '2xl': 'text-4xl sm:text-5xl md:text-6xl'
}

// Premium Fortune 500 Logo Icon
const LogoIcon = ({ size = 'md', className = '' }: { size: string, className?: string }) => (
  <svg className={`${sizeClasses[size as keyof typeof sizeClasses]} ${className}`} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Premium geometric outer ring */}
    <circle
      cx="40"
      cy="40"
      r="38"
      fill="none"
      stroke="url(#emeraldGradient)"
      strokeWidth="2"
      className="opacity-20"
    />
    
    {/* Precision inner ring */}
    <circle
      cx="40"
      cy="40"
      r="32"
      fill="none"
      stroke="url(#emeraldGradient)"
      strokeWidth="1.5"
      className="opacity-40"
    />

    {/* Main logo container - sophisticated hexagonal base */}
    <path
      d="M40 8 L62 24 L62 56 L40 72 L18 56 L18 24 Z"
      fill="url(#primaryGradient)"
      stroke="url(#accentGradient)"
      strokeWidth="1"
      className="drop-shadow-lg"
    />

    {/* Inner architectural frame */}
    <path
      d="M40 16 L56 28 L56 52 L40 64 L24 52 L24 28 Z"
      fill="none"
      stroke="url(#innerGradient)"
      strokeWidth="0.8"
      opacity="0.6"
    />

        {/* The Premium 'M' - Masterpiece Typography - Maximum Size */}
        <g transform="translate(40, 40)">
          {/* Main M structure - Bold and architectural - Maximum Big */}
          <path
            d="M-22 -20 L-22 20 M-22 -20 L-10 12 M-10 12 L14 -20 M14 -20 L14 20 M-10 12 L10 -10"
            stroke="#065f46"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-lg"
          />
          
          {/* Sophisticated inner details - Enhanced */}
          <path
            d="M-20 -16 L-14 8 M12 -16 L16 -8"
            stroke="#059669"
            strokeWidth="2.8"
            strokeLinecap="round"
            opacity="0.9"
          />
          
          {/* Premium accent lines - Enhanced */}
          <path
            d="M-22 18 L-18 18 M12 18 L16 18"
            stroke="#10b981"
            strokeWidth="4.0"
            strokeLinecap="round"
            opacity="0.95"
          />
          
          {/* Center precision point - Enhanced */}
          <circle
            cx="0"
            cy="2"
            r="3.0"
            fill="#065f46"
            className="drop-shadow-md"
          />
          
          {/* Additional premium details */}
          <path
            d="M-16 -12 L-12 4 M8 -12 L12 4"
            stroke="#34d399"
            strokeWidth="2.0"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

    {/* Precision corner markers - Fortune 500 attention to detail */}
    <g opacity="0.4">
      <path d="M20 20 L24 20 L24 24" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M60 20 L56 20 L56 24" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M20 60 L24 60 L24 56" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M60 60 L56 60 L56 56" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
    </g>

    {/* Gradients for premium finish */}
    <defs>
      <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ecfdf5" stopOpacity="0.95"/>
        <stop offset="50%" stopColor="#d1fae5" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.85"/>
      </linearGradient>
      
      <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#059669"/>
        <stop offset="100%" stopColor="#065f46"/>
      </linearGradient>
      
      <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981"/>
        <stop offset="100%" stopColor="#059669"/>
      </linearGradient>
      
      <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#34d399" stopOpacity="0.6"/>
      </linearGradient>
    </defs>
  </svg>
)

// Minimal version for small sizes
const LogoIconMinimal = ({ size = 'md', className = '' }: { size: string, className?: string }) => (
  <svg className={`${sizeClasses[size as keyof typeof sizeClasses]} ${className}`} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Simplified hexagonal container */}
    <path
      d="M30 4 L50 16 L50 44 L30 56 L10 44 L10 16 Z"
      fill="url(#minimalGradient)"
      stroke="#059669"
      strokeWidth="1.5"
    />

    {/* Clean M letterform */}
    <g transform="translate(30, 30)">
      <path
        d="M-12 -10 L-12 10 M-12 -10 L-2 4 M-2 4 L8 -10 M8 -10 L8 10"
        stroke="#065f46"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>

    <defs>
      <linearGradient id="minimalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ecfdf5"/>
        <stop offset="100%" stopColor="#d1fae5"/>
      </linearGradient>
    </defs>
  </svg>
)

// Modern Tech-Forward Design - Alternative Fortune 500 Logo
const LogoIconModern = ({ size = 'md', className = '' }: { size: string, className?: string }) => (
  <svg className={`${sizeClasses[size as keyof typeof sizeClasses]} ${className}`} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Modern circular foundation with tech-inspired rings */}
    <circle
      cx="40"
      cy="40"
      r="38"
      fill="none"
      stroke="url(#modernGradient)"
      strokeWidth="1"
      opacity="0.15"
      strokeDasharray="4 2"
    />
    
    <circle
      cx="40"
      cy="40"
      r="34"
      fill="none"
      stroke="url(#modernGradient)"
      strokeWidth="1.5"
      opacity="0.25"
    />

    {/* Main modern container - sleek rounded rectangle */}
    <rect
      x="8"
      y="8"
      width="64"
      height="64"
      rx="16"
      fill="url(#modernPrimaryGradient)"
      stroke="url(#modernAccentGradient)"
      strokeWidth="1.2"
      filter="url(#modernShadow)"
    />

    {/* Inner tech frame */}
    <rect
      x="14"
      y="14"
      width="52"
      height="52"
      rx="10"
      fill="none"
      stroke="url(#modernInnerGradient)"
      strokeWidth="0.8"
      opacity="0.4"
    />

    {/* Ultra-Modern M Design - Angular and Tech-Forward */}
    <g transform="translate(40, 40)">
      {/* Main M structure - Clean angular design */}
      <path
        d="M-18 -16 L-18 16 M-18 -16 L0 8 M0 8 L18 -16 M18 -16 L18 16"
        stroke="#065f46"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#modernTextShadow)"
      />
      
      {/* Tech-inspired accent details */}
      <path
        d="M-16 -12 L-6 4 M6 4 L16 -12"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* Modern baseline accents */}
      <path
        d="M-18 14 L-10 14 M10 14 L18 14"
        stroke="#059669"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      
      {/* Central tech point */}
      <circle
        cx="0"
        cy="4"
        r="2"
        fill="url(#modernPointGradient)"
        filter="url(#modernTextShadow)"
      />
      
      {/* Side tech indicators */}
      <rect x="-20" y="12" width="4" height="2" rx="1" fill="#10b981" opacity="0.7"/>
      <rect x="16" y="12" width="4" height="2" rx="1" fill="#10b981" opacity="0.7"/>
    </g>

    {/* Modern corner tech elements */}
    <g opacity="0.3">
      <rect x="12" y="12" width="6" height="1.5" rx="0.75" fill="#059669"/>
      <rect x="62" y="12" width="6" height="1.5" rx="0.75" fill="#059669"/>
      <rect x="12" y="66.5" width="6" height="1.5" rx="0.75" fill="#059669"/>
      <rect x="62" y="66.5" width="6" height="1.5" rx="0.75" fill="#059669"/>
    </g>

    {/* Modern gradients and effects */}
    <defs>
      <linearGradient id="modernPrimaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0fdf4" stopOpacity="0.95"/>
        <stop offset="50%" stopColor="#dcfce7" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#bbf7d0" stopOpacity="0.85"/>
      </linearGradient>
      
      <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981"/>
        <stop offset="100%" stopColor="#059669"/>
      </linearGradient>
      
      <linearGradient id="modernAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34d399"/>
        <stop offset="100%" stopColor="#10b981"/>
      </linearGradient>
      
      <linearGradient id="modernInnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#34d399" stopOpacity="0.4"/>
      </linearGradient>
      
      <radialGradient id="modernPointGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981"/>
        <stop offset="100%" stopColor="#065f46"/>
      </radialGradient>
      
      <filter id="modernShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#065f46" floodOpacity="0.12"/>
      </filter>
      
      <filter id="modernTextShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#065f46" floodOpacity="0.25"/>
      </filter>
    </defs>
  </svg>
)

// Main Logo Component - Fortune 500 Grade
export const MillstoneLogo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  showText = true
}) => {
  const renderLogo = () => {
    switch (variant) {
      case 'icon':
        return <LogoIcon size={size} className={className} />
        
      case 'minimal':
        return <LogoIconMinimal size={size} className={className} />
        
      case 'modern-icon':
        return <LogoIconModern size={size} className={className} />
        
      case 'modern':
        return (
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <LogoIconModern size={size} className={className} />
            {showText && (
              <div className="flex flex-col min-w-0">
                <span className={`poppins-bold ${textSizeClasses[size as keyof typeof textSizeClasses]} text-emerald-800 tracking-tight leading-none truncate`}>
                  Millstone Compliance
                </span>
                <span className="poppins-medium text-[10px] sm:text-xs text-emerald-600 tracking-widest uppercase mt-0.5 sm:mt-1 truncate">
                  PPT Compliance Solutions
                </span>
              </div>
            )}
          </div>
        )
        
      case 'horizontal':
        return (
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <LogoIcon size={size} className={className} />
            {showText && (
              <div className="flex flex-col min-w-0">
                <span className={`poppins-bold ${textSizeClasses[size as keyof typeof textSizeClasses]} text-emerald-800 tracking-tight leading-none truncate`}>
                  Millstone Compliance
                </span>
                <span className="poppins-medium text-[10px] sm:text-xs text-emerald-600 tracking-widest uppercase mt-0.5 sm:mt-1 truncate">
                  PPT Compliance Solutions
                </span>
              </div>
            )}
          </div>
        )
        
      case 'full':
      default:
        return (
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <LogoIcon size={size} className={className} />
            {showText && (
              <div className="flex flex-col min-w-0">
                <span className={`poppins-bold ${textSizeClasses[size as keyof typeof textSizeClasses]} text-emerald-800 tracking-tight leading-none truncate`}>
                  Millstone Compliance
                </span>
                <span className="poppins-medium text-[10px] sm:text-xs text-emerald-600 tracking-widest uppercase mt-0.5 sm:mt-1 truncate">
                  PPT Compliance Solutions
                </span>
              </div>
            )}
          </div>
        )
    }
  }

  return renderLogo()
}

// Keep backward compatibility
export const MeridianLogo = MillstoneLogo

export default MillstoneLogo
