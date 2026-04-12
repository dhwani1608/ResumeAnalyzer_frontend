"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const OrbitHero = () => {
  return (
    <div className="orbit-container w-full h-[600px] pointer-events-none">
      {/* Central AI Core */}
      <div className="relative z-20 w-32 h-32 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-[0_0_80px_rgba(109,40,217,0.3)] border-4 border-white/20">
        <div className="text-white font-serif italic text-4xl">T/</div>
      </div>

      {/* Orbit Rings */}
      {[240, 420, 600].map((size, i) => (
        <div 
          key={i} 
          className="orbit-ring"
          style={{ 
            width: size, 
            height: size, 
            '--duration': `${15 + i * 5}s` 
          } as any}
        >
          {/* Orbiting Elements */}
          {[0, 120, 240].map((angle, j) => (
            <div 
              key={j}
              className="absolute w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-xl flex items-center justify-center overflow-hidden transition-transform"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translate(${size / 2}px) rotate(-${angle}deg)`,
              }}
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">
                {['📄', '🎯', '💼', '🚀', '👤', '💡'][ (i * 3 + j) % 6 ]}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-100/10 rounded-full blur-[100px] -z-10" />
    </div>
  );
};
