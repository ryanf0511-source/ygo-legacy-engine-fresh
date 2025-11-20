import { Link } from "react-router-dom";

const NewHomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero/Story Section */}
      <div className="text-center max-w-5xl mx-auto space-y-6">
        <h1 className="text-6xl md:text-7xl font-bold mb-4">
          <span className="text-white">YGO SJC</span>{" "}
          <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
            Database
          </span>
        </h1>
        <div className="relative bg-slate-900/50 backdrop-blur-md rounded-xl border border-fuchsia-500/30 p-8 shadow-2xl shadow-fuchsia-500/10">
          <div className="text-gray-300 space-y-4 text-left">
            <p className="text-lg italic text-amber-400 font-semibold">
              "The story of how this database came to be..."
            </p>
            <p>
              This comprehensive Yu-Gi-Oh! SJC database represents years of tournament history, 
              cataloging thousands of competitive decklists and card usage data from the golden era 
              of Yu-Gi-Oh! competitive play. Our mission is to preserve this legacy and provide 
              players with the tools to study, analyze, and appreciate the evolution of the game.
            </p>
            <p>
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
          className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-blue-800/20 backdrop-blur-md rounded-xl border border-blue-500/40 p-6 hover:border-blue-400/80 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors">Decklists</h3>
                <p className="text-sm text-cyan-400">911 decks</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">Browse complete tournament-winning decklists with advanced filtering by player, deck type, and event.</p>
          </div>
          <div className="flex items-center text-blue-400 group-hover:text-cyan-400 transition-colors">
            <span className="text-sm font-medium">View Decklists</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </Link>

        {/* Master Lists Hub */}
        <Link
          to="/master-lists"
          className="md:col-span-2 bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-emerald-800/20 backdrop-blur-md rounded-xl border border-emerald-500/40 p-6 hover:border-emerald-400/80 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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

        {/* Statistics */}
        <Link
          to="/stats"
          className="md:col-span-2 bg-gradient-to-br from-amber-600/20 via-orange-600/20 to-amber-800/20 backdrop-blur-md rounded-xl border border-amber-500/40 p-6 hover:border-amber-400/80 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-amber-500/20 border border-amber-400/30 rounded-lg">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">Statistics</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm">View trends, popular cards, and meta analysis.</p>
          </div>
        </Link>

        {/* Under Construction Cards */}
        <div className="md:col-span-2 bg-gradient-to-br from-gray-700/20 to-gray-800/20 backdrop-blur-md rounded-xl border border-gray-600/30 p-6 flex flex-col justify-center items-center">
          <svg className="w-8 h-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <h3 className="text-lg font-bold text-gray-400 mb-1">Streaming</h3>
          <p className="text-xs text-gray-500 text-center">Under Construction</p>
        </div>

        <div className="md:col-span-2 bg-gradient-to-br from-gray-700/20 to-gray-800/20 backdrop-blur-md rounded-xl border border-gray-600/30 p-6 flex flex-col justify-center items-center">
          <svg className="w-8 h-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <h3 className="text-lg font-bold text-gray-400 mb-1">TCGplayer Guide</h3>
          <p className="text-xs text-gray-500 text-center">Under Construction</p>
        </div>

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
