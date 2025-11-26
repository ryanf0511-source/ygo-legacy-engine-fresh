import { Link } from "react-router-dom";

const NewHomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h1 className="text-6xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
              YGOLegacyEngine
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Your definitive archive for <span className="text-fuchsia-400 font-semibold">Yu-Gi-Oh! Shonen Jump Championship</span> history (2004-2010)
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Driven by a passion for the game's rich history, I built YGOLegacyEngine to unlock the full experience of every SJC format. Anyone can play, explore, and relive classic decks from 2005 to 2010, with every card choice and format instantly accessible. This project is more than a database; it's about sharing nostalgia, bringing people together, and keeping the legacy alive for fans everywhere.
          </p>
        </div>
      </section>

      {/* Primary Features - Emphasis & Separation */}
      <section className="px-4 pb-12 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Core Features</h2>
          <p className="text-gray-400">Explore cards and track your collection</p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Browser - Primary Feature */}
          <Link
            to="/cards"
            className="group relative bg-gradient-to-br from-fuchsia-600/10 to-purple-600/10 backdrop-blur-md rounded-2xl border-2 border-fuchsia-500/40 p-8 hover:border-fuchsia-400/80 hover:shadow-2xl hover:shadow-fuchsia-500/30 transition-all duration-300 flex flex-col"
          >
            {/* Icon and Title - Proximity */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="p-4 bg-fuchsia-500/20 rounded-xl border border-fuchsia-400/30 group-hover:bg-fuchsia-500/30 transition-colors">
                <svg className="w-10 h-10 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-fuchsia-400 transition-colors">Card Browser</h3>
                <p className="text-amber-400 font-semibold text-sm">30,224 records</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 flex-1">Search and explore individual card usage across all SJC tournaments. Filter by card type, deck, event, and more.</p>
            <div className="flex items-center text-fuchsia-400 group-hover:text-amber-400 transition-colors font-medium">
              <span>Explore Cards</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>

          {/* Master Lists - Primary Feature */}
          <Link
            to="/master-lists"
            className="group relative bg-gradient-to-br from-emerald-600/10 to-teal-600/10 backdrop-blur-md rounded-2xl border-2 border-emerald-500/40 p-8 hover:border-emerald-400/80 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-start space-x-4 mb-6">
              <div className="p-4 bg-emerald-500/20 rounded-xl border border-emerald-400/30 group-hover:bg-emerald-500/30 transition-colors">
                <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Master Lists</h3>
                <p className="text-teal-400 font-semibold text-sm">Collection Checklists</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 flex-1">Track your collection with comprehensive card inventories for different formats including Main Deck and Extra Deck.</p>
            <div className="flex items-center text-emerald-400 group-hover:text-teal-400 transition-colors font-medium">
              <span>View Master Lists</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>
        </div>
      </section>

      {/* Secondary Features - Common Region & Symmetry */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Tools & Resources</h2>
          <p className="text-gray-400">Explore tournament decklists and analyze the meta</p>
        </div>
        
        {/* Symmetrical grid - all items equal importance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Decklists */}
          <Link
            to="/decklists"
            className="group bg-gradient-to-br from-blue-600/10 to-indigo-600/10 backdrop-blur-md rounded-xl border-2 border-blue-500/40 p-6 hover:border-blue-400/80 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex flex-col items-center text-center space-y-4 flex-1">
              <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-400/30 group-hover:bg-blue-500/30 transition-colors">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Decklists</h3>
                <p className="text-sm text-gray-400 mb-3">911 tournament decks</p>
                <p className="text-gray-300 text-sm">Browse complete tournament-winning decklists</p>
              </div>
            </div>
          </Link>

          {/* Head-to-Head */}
          <Link
            to="/head-to-head"
            className="group bg-gradient-to-br from-indigo-600/10 to-violet-600/10 backdrop-blur-md rounded-xl border-2 border-indigo-500/40 p-6 hover:border-violet-400/80 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex flex-col items-center text-center space-y-4 flex-1">
              <div className="p-4 bg-indigo-500/20 rounded-xl border border-indigo-400/30 group-hover:bg-indigo-500/30 transition-colors">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Head-to-Head</h3>
                <p className="text-sm text-gray-400 mb-3">Deck Builder</p>
                <p className="text-gray-300 text-sm">Build matchups with historical tournament decklists</p>
              </div>
            </div>
          </Link>

          {/* Statistics */}
          <Link
            to="/stats"
            className="group bg-gradient-to-br from-amber-600/10 to-orange-600/10 backdrop-blur-md rounded-xl border-2 border-amber-500/40 p-6 hover:border-amber-400/80 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex flex-col items-center text-center space-y-4 flex-1">
              <div className="p-4 bg-amber-500/20 rounded-xl border border-amber-400/30 group-hover:bg-amber-500/30 transition-colors">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Statistics</h3>
                <p className="text-sm text-gray-400 mb-3">Meta Analysis</p>
                <p className="text-gray-300 text-sm">Analyze trends and deck popularity over time</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NewHomePage;
