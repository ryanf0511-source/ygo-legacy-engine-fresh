import React, { useState, useEffect } from 'react';

const CheckboxTutorial = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);

  // Auto-play animation once on mount
  useEffect(() => {
    if (!hasAutoPlayed) {
      const timer = setTimeout(() => {
        setIsChecked(true);
        setTimeout(() => {
          setIsChecked(false);
          setHasAutoPlayed(true);
        }, 1500);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasAutoPlayed]);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
      <h3 className="text-sm font-semibold text-gray-300 mb-3 text-center">
        How It Works
      </h3>
      
      <div className="flex items-center justify-center gap-4">
        {/* Interactive Card Example */}
        <div 
          onClick={handleClick}
          className="relative cursor-pointer group transition-transform hover:scale-105"
        >
          {/* Card Container */}
          <div className={`
            w-24 h-32 rounded-lg border-2 transition-all duration-300
            ${isChecked 
              ? 'bg-gradient-to-br from-orange-900 to-yellow-800 border-yellow-600 shadow-lg shadow-yellow-500/50' 
              : 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600'
            }
          `}>
            {/* Card Frame Design */}
            <div className="h-full flex flex-col justify-between p-2">
              {/* Top decoration */}
              <div className="h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded"></div>
              
              {/* Center area */}
              <div className="flex-1 flex items-center justify-center">
                <div className={`
                  w-12 h-12 rounded border-2 transition-all duration-300
                  ${isChecked 
                    ? 'bg-yellow-400/20 border-yellow-400' 
                    : 'bg-slate-600/30 border-slate-500'
                  }
                `}></div>
              </div>
              
              {/* Bottom decoration */}
              <div className="h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded"></div>
            </div>

            {/* Checkbox Overlay */}
            <div className={`
              absolute top-1 right-1 w-6 h-6 rounded border-2 
              flex items-center justify-center
              transition-all duration-300
              ${isChecked 
                ? 'bg-green-500 border-green-400' 
                : 'bg-slate-700/80 border-slate-500'
              }
            `}>
              {isChecked && (
                <svg 
                  className="w-4 h-4 text-white animate-scale-in" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              )}
            </div>

            {/* Pulse effect on auto-play */}
            {!hasAutoPlayed && (
              <div className="absolute inset-0 rounded-lg animate-pulse bg-fuchsia-500/20"></div>
            )}
          </div>

          {/* Label */}
          <div className={`
            mt-2 text-xs font-semibold text-center transition-colors duration-300
            ${isChecked ? 'text-green-400' : 'text-red-400'}
          `}>
            {isChecked ? '✓ OWNED' : '☐ NEED'}
          </div>
        </div>

        {/* Instructions */}
        <div className="flex-1 text-xs text-gray-400 leading-relaxed">
          <p className="mb-2">
            <span className="text-red-400 font-semibold">Unchecked (☐)</span> = You <span className="text-red-400 font-semibold">need</span> this card
          </p>
          <p>
            <span className="text-green-400 font-semibold">Checked (✓)</span> = You <span className="text-green-400 font-semibold">own</span> this card
          </p>
          <p className="mt-2 text-fuchsia-400 italic">
            Click the card to try it!
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-3 pt-3 border-t border-slate-700 text-center">
        <p className="text-xs text-gray-500">
          Your progress saves automatically
        </p>
      </div>
    </div>
  );
};

export default CheckboxTutorial;
