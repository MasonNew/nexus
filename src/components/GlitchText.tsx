import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    const glitch = () => {
      const originalText = text;
      let iterations = 0;
      
      const interval = setInterval(() => {
        setDisplayText(
          originalText
            .split('')
            .map((char, index) => {
              if (index < iterations) {
                return originalText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        iterations += 1/3;
        
        if (iterations >= originalText.length) {
          clearInterval(interval);
        }
      }, 30);
      
      timeouts.push(setTimeout(() => clearInterval(interval), 3000));
    };
    
    glitch();
    const interval = setInterval(glitch, 10000);
    
    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, [text]);

  return (
    <span className={`font-mono ${className}`} style={{ textShadow: '0 0 5px #00FFF5' }}>
      {displayText}
    </span>
  );
};

export default GlitchText;