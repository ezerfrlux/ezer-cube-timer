import { useEffect, useRef } from 'react';
import * as SRVisualizer from 'sr-visualizer';
import { Face } from 'sr-visualizer';

interface Props {
  scramble: string;
}

const CubeVisualizer = ({ scramble }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';

      const wcaColorScheme = {
        [Face.U]: '#FFFFFF', 
        [Face.D]: '#FEFE00', 
        [Face.F]: '#00D800', 
        [Face.B]: '#0000F2', 
        [Face.L]: '#FFA100', 
        [Face.R]: '#EE0000', 
      };

      SRVisualizer.cubeSVG(containerRef.current, {
        cubeSize: 3,
        width: 250,
        height: 180,
        algorithm: scramble, 
        colorScheme: wcaColorScheme
      } as any);
      
      const svg = containerRef.current.querySelector('svg');
      if (svg) {
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.backgroundColor = 'transparent';
      }
    }
  }, [scramble]);

  return (
    <div className="flex items-center justify-center transition-all duration-500">
      <div 
        ref={containerRef} 
        className="w-full max-w-[250px] flex items-center justify-center min-h-[150px]"
      />
    </div>
  );
};

export default CubeVisualizer;