import React, { useEffect, useState } from 'react';

interface DotMatrixProps {
  art: string[];
  color?: string;
  delay?: number;
}

const DotMatrix: React.FC<DotMatrixProps> = ({ 
  art, 
  color = '#FF00FF',
  delay = 50 
}) => {
  const [visibleDots, setVisibleDots] = useState<boolean[][]>([]);
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const dots: boolean[][] = art.map(line => 
      Array(line.length).fill(false)
    );
    setVisibleDots(dots);
    setLines(art);

    let currentDot = 0;
    const totalDots = art.reduce((sum, line) => 
      sum + line.split('').filter(char => char !== ' ').length, 0
    );

    const interval = setInterval(() => {
      if (currentDot >= totalDots) {
        clearInterval(interval);
        return;
      }

      setVisibleDots(prev => {
        const newDots = [...prev];
        let dotsCount = 0;
        let found = false;

        for (let i = 0; i < art.length && !found; i++) {
          for (let j = 0; j < art[i].length; j++) {
            if (art[i][j] !== ' ') {
              if (dotsCount === currentDot) {
                newDots[i] = [...newDots[i]];
                newDots[i][j] = true;
                found = true;
                break;
              }
              dotsCount++;
            }
          }
        }

        return newDots;
      });

      currentDot++;
    }, delay);

    return () => clearInterval(interval);
  }, [art, delay]);

  return (
    <div className="font-mono whitespace-pre">
      {lines.map((line, i) => (
        <div key={i} className="leading-none">
          {line.split('').map((char, j) => (
            <span 
              key={j}
              style={{
                color: char !== ' ' && visibleDots[i]?.[j] ? color : 'transparent',
                textShadow: char !== ' ' && visibleDots[i]?.[j] 
                  ? `0 0 5px ${color}` 
                  : 'none'
              }}
            >
              {char === ' ' ? ' ' : '•'}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DotMatrix;