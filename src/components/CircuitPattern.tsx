import React from 'react';

const CircuitPattern: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 2px 2px, #39FF14 1px, transparent 1px),
          linear-gradient(to right, #00FFF5 1px, transparent 1px),
          linear-gradient(to bottom, #00FFF5 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px, 48px 48px, 48px 48px',
        opacity: 0.1
      }} />
    </div>
  );
};

export default CircuitPattern;