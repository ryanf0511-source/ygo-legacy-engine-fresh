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
          {/* Actual Card Image */}
          <img 
            src={isChecked 
              ? "https://customer-assets.emergentagent.com/job_06faf8c6-90d3-4b3a-a4d9-28cab6ba6465/artifacts/egbe1rhi_nomral%20monster%20checkmark.png"
              : "https://customer-assets.emergentagent.com/job_06faf8c6-90d3-4b3a-a4d9-28cab6ba6465/artifacts/fm8s9adl_back%20of%20card%20blank.png"
            }
            alt={isChecked ? "Card Owned" : "Card Needed"}
            className={`w-24 h-auto rounded transition-all duration-300 ${
              isChecked ? 'shadow-lg shadow-green-500/30' : 'shadow-md'
            }`}
          />

          {/* Pulse effect on auto-play */}
          {!hasAutoPlayed && (
            <div className="absolute inset-0 rounded animate-pulse bg-fuchsia-500/20"></div>
          )}

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
            <span className="text-red-400 font-semibold">Card back (☐)</span> = You <span className="text-red-400 font-semibold">need</span> this card
          </p>
          <p>
            <span className="text-green-400 font-semibold">With checkmark (✓)</span> = You <span className="text-green-400 font-semibold">own</span> this card
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
