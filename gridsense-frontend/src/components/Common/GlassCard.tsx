import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'blue' | 'cyan' | 'amber' | 'red' | 'green' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = 'none',
  onClick
}) => {
  const glowClasses = {
    none: '',
    blue: 'hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,179,255,0.15)] transition-all duration-300',
    cyan: 'border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,255,0.12)]',
    amber: 'border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.12)]',
    red: 'border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]',
    green: 'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
  };

  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-xl p-5 ${glowClasses[glow]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
