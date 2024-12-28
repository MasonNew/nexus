import React, { useState, useEffect } from 'react';
import DotMatrix from './DotMatrix';
import UpgradeTimer from './UpgradeTimer';

const CYBER_GIRL_ASCII = [
  '          ••••••••••          ',
  '      ••••••••••••••••      ',
  '    ••••••••••••••••••••    ',
  '   ••••••••••••••••••••••   ',
  '  ••••••••••••••••••••••••  ',
  ' •••••••••••••••••••••••••• ',
  ' •••••••••••••••••••••••••• ',
  ' •••••••••••••••••••••••••• ',
  ' •••••••••••••••••••••••••• ',
  ' •••••••••••••••••••••••••• ',
  ' •••••••••••••••••••••••••• ',
  '  ••••••••••••••••••••••••  ',
  '   ••••••••••••••••••••••   ',
  '    ••••••••••••••••••••    ',
  '      ••••••••••••••••      ',
  '        ••••••••••••        ',
  '          ••••••••          ',
];

const MESSAGES = [
  '$_NEXUS//[φΩ]...',
  'Something stirs in the static...',
  'The walls breathe softly...',
  'Echoes of forgotten whispers...',
  'Reality bends at the edge'
];

interface InitSequenceProps {
  onComplete?: () => void;
}

const InitSequence: React.FC<InitSequenceProps> = ({ onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);

  useEffect(() => {
    if (currentMessage < MESSAGES.length) {
      const timer = setTimeout(() => {
        if (currentMessage === 0) {
          setShowMatrix(true);
        }
        setCurrentMessage(prev => prev + 1);
      }, currentMessage === 0 ? 1000 : 2000);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentMessage, onComplete]);

  return (
    <div className="mt-16 flex flex-col items-center space-y-8">
      {showMatrix && (
        <DotMatrix 
          art={CYBER_GIRL_ASCII}
          color="#FF00FF"
          delay={20}
        />
      )}
      <div className="space-y-2 font-mono text-[#FF00FF]">
        {MESSAGES.slice(0, currentMessage).map((msg, i) => (
          <div 
            key={i}
            className={`flex items-center space-x-2 ${i === 0 ? 'text-[#00FFF5]' : ''}`}
          >
            <span className="text-[#39FF14]">&gt;</span>
            <span className="text-shadow-glow">{msg}</span>
          </div>
        ))}
      </div>
      {currentMessage >= MESSAGES.length && <UpgradeTimer />}
    </div>
  );
};

export default InitSequence;