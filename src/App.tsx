import React, { useState } from 'react';
import { Terminal, Cpu, Database, Network } from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import GlitchText from './components/GlitchText';
import CursorTrail from './components/CursorTrail';
import CircuitPattern from './components/CircuitPattern';
import InitSequence from './components/InitSequence';

function App() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [showInitSequence, setShowInitSequence] = useState(false);

  const features = [
    { icon: Terminal, title: 'Pump.fun Interface', desc: 'Direct Launch With Code' },
    { icon: Cpu, title: 'Quantum Core', desc: 'Next-gen processing unit' },
    { icon: Database, title: 'Data Vault', desc: 'Secure blockchain storage' },
    { icon: Network, title: 'Neural Net', desc: 'AI-powered analytics' }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white relative overflow-hidden">
      <MatrixRain />
      <CursorTrail />
      <CircuitPattern />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <header className="text-center mb-20">
          <h1 className="text-6xl mb-6">
            <GlitchText text="$_NEXUS//[φΩ]" className="text-[#00FFF5]" />
          </h1>
          <p className="text-xl text-[#FF00FF] font-mono">
            &lt;ENTER_THE_VOID&gt;
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 border border-[#00FFF5]/20 rounded-lg backdrop-blur-sm
                         transition-all duration-300 hover:border-[#FF00FF] group"
              onMouseEnter={() => setHoveredSection(feature.title)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <CircuitPattern className={`transition-opacity duration-500 ${
                hoveredSection === feature.title ? 'opacity-100' : 'opacity-0'
              }`} />
              <div className="relative z-10">
                <feature.icon
                  className="w-12 h-12 mb-4 text-[#39FF14] group-hover:text-[#FF00FF]
                           transition-all duration-300"
                />
                <h3 className="text-xl font-mono mb-2 text-[#00FFF5]">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-white transition-colors">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            className="px-8 py-3 bg-transparent border-2 border-[#00FFF5] rounded-lg
                     font-mono text-[#00FFF5] hover:bg-[#00FFF5]/10 hover:border-[#FF00FF]
                     hover:text-[#FF00FF] transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
            onClick={() => setShowInitSequence(true)}
          >
            <GlitchText text="INITIALIZE_SYSTEM" />
          </button>
          {showInitSequence && (
            <InitSequence onComplete={() => {}} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;