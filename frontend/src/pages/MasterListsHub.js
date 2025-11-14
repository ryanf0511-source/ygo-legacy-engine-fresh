import { Link } from "react-router-dom";

const MasterListsHub = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">
          Master <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Lists</span>
        </h1>
        <p className="text-gray-400">Complete collection checklists for different formats and card pools</p>
      </div>

      {/* Master Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SJC Master 2P List (Main Deck) */}
        <Link
          to="/master-2p"
          className="bg-gradient-to-br from-emerald-600/20 via-green-600/20 to-amber-800/20 backdrop-blur-md rounded-xl border border-emerald-500/40 p-8 hover:border-amber-400/80 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 group"
        >
          <div className="flex items-start space-x-4 mb-4">
            <div className="p-4 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                SJC Master 2P List
              </h3>
              <p className="text-emerald-400 font-semibold mb-1">(Main Deck)</p>
              <p className="text-gray-300 text-sm">
                Complete main deck card inventory for Master 2 Player collection
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-emerald-500/20">
            <div className="text-sm">
              <span className="text-gray-400">Total Cards: </span>
              <span className="text-amber-400 font-bold">2,306</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-400">Unique: </span>
              <span className="text-emerald-400 font-bold">510</span>
            </div>
          </div>
          <div className="flex items-center text-emerald-400 group-hover:text-amber-400 transition-colors mt-4">
            <span className="text-sm font-medium">View Checklist</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </Link>

        {/* SJC Master List (Extra Deck) */}
        <Link
          to="/master-extra-deck"
          className="bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-purple-800/20 backdrop-blur-md rounded-xl border border-purple-500/40 p-8 hover:border-blue-400/80 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group"
        >
          <div className="flex items-start space-x-4 mb-4">
            <div className="p-4 bg-purple-500/20 rounded-lg border border-purple-400/30">
              <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                SJC Master List
              </h3>
              <p className="text-purple-400 font-semibold mb-1">(Extra Deck / Fusion)</p>
              <p className="text-gray-300 text-sm">
                Complete extra deck and fusion card inventory (2005-2010 SJC era)
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-purple-500/20">
            <div className="text-sm">
              <span className="text-gray-400">Total Cards: </span>
              <span className="text-blue-400 font-bold">123</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-400">Unique: </span>
              <span className="text-purple-400 font-bold">123</span>
            </div>
          </div>
          <div className="flex items-center text-purple-400 group-hover:text-blue-400 transition-colors mt-4">
            <span className="text-sm font-medium">View Checklist</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </Link>

        {/* Coming Soon Cards */}
        <div className="bg-gradient-to-br from-gray-700/20 to-gray-800/20 backdrop-blur-md rounded-xl border border-gray-600/30 p-8 flex flex-col justify-center items-center">
          <svg className="w-12 h-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 className="text-xl font-bold text-gray-400 mb-2">More Lists Coming Soon</h3>
          <p className="text-sm text-gray-500 text-center">Additional master lists for different years and formats</p>
        </div>

        <div className="bg-gradient-to-br from-gray-700/20 to-gray-800/20 backdrop-blur-md rounded-xl border border-gray-600/30 p-8 flex flex-col justify-center items-center">
          <svg className="w-12 h-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-400 mb-2">Year-Specific Lists</h3>
          <p className="text-sm text-gray-500 text-center">Format-specific master lists by year</p>
        </div>
      </div>
    </div>
  );
};

export default MasterListsHub;
