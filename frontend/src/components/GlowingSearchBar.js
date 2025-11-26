import React from 'react';
import '../styles/GlowingSearchBar.css';

const GlowingSearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search...",
  className = ""
}) => {
  return (
    <div id="main" className={`glowing-search-wrapper ${className}`}>
      <div id="poda">
        <div className="glow"></div>
        <div className="darkBorderBg"></div>
        <div className="white"></div>
        <div className="border"></div>
        
        <div id="search-icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        
        <input 
          type="text" 
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input" 
          autoComplete="off"
        />
        
        <div id="input-mask"></div>
        <div id="pink-mask"></div>
      </div>
    </div>
  );
};

export default GlowingSearchBar;
