import { Link } from "react-router-dom";

const NewHomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero/Story Section */}
      <div className="text-center max-w-5xl mx-auto space-y-6">
        <h1 className="text-6xl md:text-7xl font-bold mb-4">
          <span className="text-white">YGO SJC</span>{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
            Database
          </span>
        </h1>
        
        {/* Story Card with Marble Background */}
        <div className="relative marble-card rounded-2xl border-2 border-yellow-600/60 p-10 shadow-2xl shadow-black/60 overflow-hidden">
          {/* Subtle holographic border accent */}
          <div className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none holographic-border"></div>
          
          <div className="relative z-10 text-gray-200 space-y-4 text-left">
            <p className="text-xl italic text-yellow-400 font-bold drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              "Preserving the Legacy of Champions..."
            </p>
            <p className="leading-relaxed text-gray-100">
              This comprehensive Yu-Gi-Oh! SJC database represents years of tournament history, 
              cataloging thousands of competitive decklists and card usage data from the golden era 
              of Yu-Gi-Oh! competitive play. Our mission is to preserve this legacy and provide 
              players with the tools to study, analyze, and appreciate the evolution of the game.
            </p>
            <p className="leading-relaxed text-gray-100">
              Whether you're a competitive player studying the meta, a collector building your 
              Master 2 Player collection, or a content creator exploring Yu-Gi-Oh! history, 
              this database serves as your comprehensive resource for SJC tournament data.
            </p>
          </div>
        </div>
      </div>

      {/* Uniform Grid - All Same Size */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Browser */}
        <Link
          to="/cards"
          className="group relative h-80 marble-card rounded-2xl border-2 border-yellow-600/50 overflow-hidden hover:border-yellow-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-900/50"
        >
          {/* Subtle holographic shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 holographic-shimmer"></div>
          
          {/* Top Half - Icon Area */}
          <div className="relative h-1/2 flex items-center justify-center bg-gradient-to-b from-yellow-900/30 via-yellow-900/15 to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-600/20 via-transparent to-transparent"></div>
            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
              <div className="p-6 bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/60 shadow-2xl shadow-yellow-900/50">
                <svg className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Bottom Half - Text */}
          <div className="h-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)] group-hover:text-yellow-300 transition-colors">Card Browser</h3>
            <p className="text-yellow-600 text-sm font-semibold mb-3">30,224 records</p>
            <p className="text-gray-200 text-sm leading-relaxed">Search and explore card usage across all SJC tournaments</p>
          </div>
        </Link>

        {/* Decklists */}
        <Link
          to="/decklists"
          className="group relative h-80 marble-card rounded-2xl border-2 border-yellow-600/50 overflow-hidden hover:border-emerald-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/50"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 holographic-shimmer-emerald"></div>
          
          <div className="relative h-1/2 flex items-center justify-center bg-gradient-to-b from-emerald-900/30 via-emerald-900/15 to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent"></div>
            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
              <div className="p-6 bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/60 shadow-2xl shadow-yellow-900/50">
                <svg className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="h-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)] group-hover:text-emerald-400 transition-colors">Decklists</h3>
            <p className="text-yellow-600 text-sm font-semibold mb-3">911 decks</p>
            <p className="text-gray-200 text-sm leading-relaxed">Browse tournament-winning decklists with advanced filtering</p>
          </div>
        </Link>

        {/* Master Lists */}
        <Link
          to="/master-lists"
          className="group relative h-80 marble-card rounded-2xl border-2 border-emerald-600/60 overflow-hidden hover:border-emerald-500/90 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/50"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 holographic-shimmer-emerald"></div>
          
          <div className="relative h-1/2 flex items-center justify-center bg-gradient-to-b from-emerald-900/30 via-emerald-900/15 to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent"></div>
            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
              <div className="p-6 bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-emerald-500/60 shadow-2xl shadow-emerald-900/50">
                <svg className="w-20 h-20 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="h-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-emerald-400 mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)] group-hover:text-emerald-300 transition-colors">Master Lists</h3>
            <p className="text-gray-400 text-sm font-semibold mb-3">Collection checklists</p>
            <p className="text-gray-200 text-sm leading-relaxed">Complete card inventories for different formats</p>
          </div>
        </Link>

        {/* Head-to-Head Builder */}
        <Link
          to="/head-to-head"
          className="group relative h-80 marble-card rounded-2xl border-2 border-yellow-600/50 overflow-hidden hover:border-yellow-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-900/50"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 holographic-shimmer"></div>
          
          <div className="relative h-1/2 flex items-center justify-center bg-gradient-to-b from-yellow-900/30 via-yellow-900/15 to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-600/20 via-transparent to-transparent"></div>
            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
              <div className="p-6 bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/60 shadow-2xl shadow-yellow-900/50">
                <svg className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="h-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)] group-hover:text-yellow-300 transition-colors">Head-to-Head</h3>
            <p className="text-gray-400 text-sm font-semibold mb-3">Deck Builder</p>
            <p className="text-gray-200 text-sm leading-relaxed">Pick two decks from any SJC event for battle</p>
          </div>
        </Link>

        {/* Statistics */}
        <Link
          to="/stats"
          className="group relative h-80 marble-card rounded-2xl border-2 border-yellow-600/50 overflow-hidden hover:border-emerald-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/50"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 holographic-shimmer-emerald"></div>
          
          <div className="relative h-1/2 flex items-center justify-center bg-gradient-to-b from-cyan-900/30 via-cyan-900/15 to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600/20 via-transparent to-transparent"></div>
            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
              <div className="p-6 bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/60 shadow-2xl shadow-yellow-900/50">
                <svg className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="h-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)] group-hover:text-emerald-400 transition-colors">Statistics</h3>
            <p className="text-gray-400 text-sm font-semibold mb-3">Meta Analysis</p>
            <p className="text-gray-200 text-sm leading-relaxed">View trends and popular cards from SJC history</p>
          </div>
        </Link>

        {/* Streaming Schedule */}
        <Link
          to="/schedule"
          className="group relative h-80 marble-card rounded-2xl border-2 border-yellow-600/50 overflow-hidden hover:border-yellow-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-900/50"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 holographic-shimmer"></div>
          
          <div className="relative h-1/2 flex items-center justify-center bg-gradient-to-b from-red-900/30 via-red-900/15 to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent"></div>
            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
              <div className="p-6 bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/60 shadow-2xl shadow-yellow-900/50">
                <svg className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="h-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)] group-hover:text-yellow-300 transition-colors">Streaming</h3>
            <p className="text-yellow-400 text-sm font-bold mb-1">Saturday @ 7:00 PM</p>
            <p className="text-gray-200 text-sm leading-relaxed">Live Yu-Gi-Oh! content and tournaments</p>
          </div>
        </Link>
      </div>

      {/* Social Links Section */}
      <div className="relative marble-card rounded-2xl border-2 border-yellow-600/50 p-8 overflow-hidden">
        <div className="absolute inset-0 rounded-2xl opacity-10 pointer-events-none holographic-border"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">Connect With Us</h3>
          <div className="flex justify-center space-x-12">
            <a href="#" className="flex flex-col items-center space-y-2 text-gray-200 hover:text-emerald-400 transition-colors group">
              <div className="p-4 bg-black/40 backdrop-blur-sm rounded-xl border-2 border-yellow-500/50 group-hover:border-emerald-500/70 transition-all shadow-lg">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="text-sm font-semibold">YouTube</span>
            </a>
            <a href="#" className="flex flex-col items-center space-y-2 text-gray-200 hover:text-emerald-400 transition-colors group">
              <div className="p-4 bg-black/40 backdrop-blur-sm rounded-xl border-2 border-yellow-500/50 group-hover:border-emerald-500/70 transition-all shadow-lg">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <span className="text-sm font-semibold">Twitter/X</span>
            </a>
            <a href="#" className="flex flex-col items-center space-y-2 text-gray-200 hover:text-emerald-400 transition-colors group">
              <div className="p-4 bg-black/40 backdrop-blur-sm rounded-xl border-2 border-yellow-500/50 group-hover:border-emerald-500/70 transition-all shadow-lg">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <span className="text-sm font-semibold">Discord</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;
