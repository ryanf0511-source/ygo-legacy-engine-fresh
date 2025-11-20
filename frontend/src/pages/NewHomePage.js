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
        <div className="relative bg-gradient-to-br from-stone-900/90 via-neutral-900/90 to-stone-950/90 rounded-2xl border-2 border-yellow-600/50 p-10 shadow-2xl shadow-yellow-900/20 overflow-hidden">
          {/* Subtle marble texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent opacity-40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-900/5 via-transparent to-transparent"></div>
          
          <div className="relative z-10 text-gray-200 space-y-4 text-left">
            <p className="text-xl italic text-yellow-400 font-bold drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              "Preserving the Legacy of Champions..."
            </p>
            <p className="leading-relaxed">
              This comprehensive Yu-Gi-Oh! SJC database represents years of tournament history, 
              cataloging thousands of competitive decklists and card usage data from the golden era 
              of Yu-Gi-Oh! competitive play. Our mission is to preserve this legacy and provide 
              players with the tools to study, analyze, and appreciate the evolution of the game.
            </p>
            <p className="leading-relaxed">
              Whether you're a competitive player studying the meta, a collector building your 
              Master 2 Player collection, or a content creator exploring Yu-Gi-Oh! history, 
              this database serves as your comprehensive resource for SJC tournament data.
            </p>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
        {/* Card Browser - Large Featured */}
        <Link
          to="/cards"
          className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-fuchsia-600/20 via-purple-600/20 to-fuchsia-800/20 backdrop-blur-md rounded-xl border border-fuchsia-500/40 p-6 hover:border-fuchsia-400/80 hover:shadow-2xl hover:shadow-fuchsia-500/30 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-fuchsia-500/20 rounded-lg border border-fuchsia-400/30">
                <svg className="w-8 h-8 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-amber-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors">Card Browser</h3>
                <p className="text-sm text-amber-400 font-semibold">30,224 records</p>
              </div>
            </div>
            <p className="text-gray-300">Search and explore individual card usage across all SJC tournaments. Filter by card type, deck, event, and more.</p>
          </div>
          <div className="flex items-center text-fuchsia-400 group-hover:text-amber-400 transition-colors">
            <span className="text-sm font-medium">Explore Cards</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </Link>

        {/* Decklists Database */}
        <Link
          to="/decklists"
          className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-purple-800/20 backdrop-blur-md rounded-xl border border-purple-500/40 p-6 hover:border-purple-400/80 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-purple-500/20 border border-purple-400/30 rounded-lg">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Decklists</h3>
                <p className="text-sm text-gray-400">911 decks</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">Browse complete tournament-winning decklists with advanced filtering by player, deck type, and event.</p>
          </div>
          <div className="flex items-center text-purple-400 group-hover:text-blue-300 transition-colors">
            <span className="text-sm font-medium">View Decklists</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </Link>

        {/* Master Lists Hub */}
        <Link
          to="/master-lists"
          className="md:col-span-2 bg-gradient-to-br from-emerald-600/20 via-green-600/20 to-amber-800/20 backdrop-blur-md rounded-xl border border-emerald-500/40 p-6 hover:border-amber-400/80 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-emerald-500/20 border border-emerald-400/30 rounded-lg">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Master Lists</h3>
                <p className="text-xs text-gray-400">Collection checklists</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">Complete card inventories for different formats (Main Deck, Extra Deck, and more)</p>
          </div>
        </Link>

        {/* Streaming Schedule */}
        <Link
          to="/schedule"
          className="md:col-span-2 bg-gradient-to-br from-rose-600/20 via-red-600/20 to-rose-800/20 backdrop-blur-md rounded-xl border border-rose-500/40 p-6 hover:border-rose-400/80 hover:shadow-xl hover:shadow-rose-500/30 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-rose-500/20 border border-rose-400/30 rounded-lg">
                <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">Streaming</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-2">Next stream:</p>
            <p className="text-rose-400 font-bold">Saturday @ 7:00 PM</p>
            <p className="text-gray-400 text-xs mt-1">Format TBD</p>
          </div>
        </Link>

        {/* Social Links */}
        <div className="md:col-span-2 bg-gradient-to-br from-amber-600/20 via-yellow-600/20 to-amber-800/20 backdrop-blur-md rounded-xl border border-amber-500/40 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Connect With Us</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors group">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-sm">YouTube</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors group">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-sm">Twitter/X</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors group">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="text-sm">Discord</span>
              </a>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <Link
          to="/stats"
          className="md:col-span-2 bg-gradient-to-br from-blue-600/20 via-cyan-600/20 to-blue-800/20 backdrop-blur-md rounded-xl border border-blue-500/40 p-6 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Statistics</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm">View trends, popular cards, and meta analysis.</p>
          </div>
        </Link>

        {/* Head-to-Head Builder */}
        <Link
          to="/head-to-head"
          className="md:col-span-2 bg-gradient-to-br from-indigo-600/20 via-violet-600/20 to-indigo-800/20 backdrop-blur-md rounded-xl border border-indigo-500/40 p-6 hover:border-violet-400/80 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-indigo-500/20 border border-indigo-400/30 rounded-lg">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">Head-to-Head</h3>
                <p className="text-xs text-gray-400">Deck Builder</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">Pick two decks from any SJC event for a head-to-head matchup!</p>
          </div>
        </Link>

        <div className="md:col-span-2 bg-gradient-to-br from-gray-700/20 to-gray-800/20 backdrop-blur-md rounded-xl border border-gray-600/30 p-6 flex flex-col justify-center items-center">
          <svg className="w-8 h-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="text-lg font-bold text-gray-400 mb-1">Feature Articles</h3>
          <p className="text-xs text-gray-500 text-center">Under Construction</p>
        </div>

        <div className="md:col-span-2 bg-gradient-to-br from-gray-700/20 to-gray-800/20 backdrop-blur-md rounded-xl border border-gray-600/30 p-6 flex flex-col justify-center items-center">
          <svg className="w-8 h-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 className="text-lg font-bold text-gray-400 mb-1">Supplies Guide</h3>
          <p className="text-xs text-gray-500 text-center">Under Construction</p>
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;
