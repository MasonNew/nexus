import React, { useState, useEffect } from 'react';
import { Shield, Zap, Binary } from 'lucide-react';

interface UpgradePhase {
  name: string;
  duration: number;
  icon: React.ElementType;
  messages: string[];
}

const UPGRADE_PHASES: UpgradePhase[] = [
  {
    name: "CORE_SYSTEMS",
    duration: 5,
    icon: Binary,
    messages: [
      "Initializing quantum matrices...",
      "Calibrating neural pathways...",
      "Optimizing core functions..."
    ]
  },
  {
    name: "DEFENSE_MATRIX",
    duration: 10,
    icon: Shield,
    messages: [
      "Upgrading firewall protocols...",
      "Implementing cryptographic shields...",
      "Fortifying system defenses..."
    ]
  },
  {
    name: "POWER_SYSTEMS",
    duration: 10,
    icon: Zap,
    messages: [
      "Charging main capacitors...",
      "Stabilizing energy grid...",
      "Maximizing power output..."
    ]
  }
];

const UpgradeTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [currentPhase, setCurrentPhase] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => 
        (prev + 1) % UPGRADE_PHASES[currentPhase].messages.length
      );
    }, 3000);

    return () => clearInterval(messageTimer);
  }, [currentPhase]);

  useEffect(() => {
    const totalTime = 25 * 60;
    const timeElapsed = totalTime - timeLeft;
    const newPhase = UPGRADE_PHASES.findIndex((phase, index) => {
      const previousDurations = UPGRADE_PHASES
        .slice(0, index)
        .reduce((sum, p) => sum + p.duration * 60, 0);
      return timeElapsed < previousDurations + phase.duration * 60;
    });
    
    if (newPhase !== -1 && newPhase !== currentPhase) {
      setCurrentPhase(newPhase);
      setMessageIndex(0);
    }
  }, [timeLeft, currentPhase]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  const CurrentIcon = UPGRADE_PHASES[currentPhase].icon;

  return (
    <div className="mt-8 w-full max-w-md mx-auto">
      <div className="border-2 border-[#00FFF5] rounded-lg p-4 bg-black/30 backdrop-blur">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CurrentIcon className="w-6 h-6 text-[#39FF14]" />
            <span className="font-mono text-[#00FFF5]">
              {UPGRADE_PHASES[currentPhase].name}
            </span>
          </div>
          <span className="font-mono text-[#FF00FF]">{formatTime(timeLeft)}</span>
        </div>
        
        <div className="relative h-2 bg-gray-800 rounded-full mb-4">
          <div 
            className="absolute top-0 left-0 h-full bg-[#39FF14] rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-mono text-sm text-[#00FFF5] opacity-80">
          <span className="text-[#39FF14]">&gt;</span> {UPGRADE_PHASES[currentPhase].messages[messageIndex]}
        </div>
      </div>
    </div>
  );
};

export default UpgradeTimer;