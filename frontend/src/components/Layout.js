import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-black via-slate-950 to-black backdrop-blur-xl border-b border-fuchsia-500/40 sticky top-0 z-50 shadow-2xl shadow-fuchsia-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-amber-400 bg-clip-text text-transparent group-hover:from-amber-400 group-hover:via-fuchsia-400 group-hover:to-purple-400 transition-all duration-500">
                  YGOLegacyEngine
                </div>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-fuchsia-400 hover:bg-slate-800/50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link
                to="/"
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive("/")
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/50 scale-105"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-slate-700/80 hover:text-fuchsia-400 hover:shadow-md hover:scale-105"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Home</span>
              </Link>
              
              <Link
                to="/cards"
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive("/cards")
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/50 scale-105"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-slate-700/80 hover:text-fuchsia-400 hover:shadow-md hover:scale-105"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="font-medium">Cards</span>
              </Link>
              
              <Link
                to="/master-lists"
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive("/master-lists")
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/50 scale-105"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-slate-700/80 hover:text-fuchsia-400 hover:shadow-md hover:scale-105"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span className="font-medium">Lists</span>
              </Link>
              
              <Link
                to="/decklists"
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive("/decklists")
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/50 scale-105"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-slate-700/80 hover:text-fuchsia-400 hover:shadow-md hover:scale-105"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium">Decks</span>
              </Link>
              
              <Link
                to="/stats"
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive("/stats")
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/50 scale-105"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-slate-700/80 hover:text-fuchsia-400 hover:shadow-md hover:scale-105"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium">Stats</span>
              </Link>
              
              <Link
                to="/head-to-head"
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive("/head-to-head")
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/50 scale-105"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-slate-700/80 hover:text-fuchsia-400 hover:shadow-md hover:scale-105"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">H2H</span>
              </Link>
              
              <Link
                to="/about"
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive("/about")
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/50 scale-105"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-slate-700/80 hover:text-fuchsia-400 hover:shadow-md hover:scale-105"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">About</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu content */}
          <div className="lg:hidden fixed top-16 left-0 right-0 bg-slate-900/98 backdrop-blur-xl border-b border-fuchsia-500/20 shadow-2xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive("/")
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white"
                  : "text-gray-300 hover:bg-slate-800/50 hover:text-fuchsia-400"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">Home</span>
            </Link>
            
            <Link
              to="/cards"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive("/cards")
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white"
                  : "text-gray-300 hover:bg-slate-800/50 hover:text-fuchsia-400"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="font-medium">Cards</span>
            </Link>
            
            <Link
              to="/master-lists"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive("/master-lists")
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white"
                  : "text-gray-300 hover:bg-slate-800/50 hover:text-fuchsia-400"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="font-medium">Master Lists</span>
            </Link>
            
            <Link
              to="/decklists"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive("/decklists")
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white"
                  : "text-gray-300 hover:bg-slate-800/50 hover:text-fuchsia-400"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">Decklists</span>
            </Link>
            
            <Link
              to="/stats"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive("/stats")
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white"
                  : "text-gray-300 hover:bg-slate-800/50 hover:text-fuchsia-400"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-medium">Stats</span>
            </Link>
            
            <Link
              to="/head-to-head"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive("/head-to-head")
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white"
                  : "text-gray-300 hover:bg-slate-800/50 hover:text-fuchsia-400"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium">Head to Head</span>
            </Link>
            
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive("/about")
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white"
                  : "text-gray-300 hover:bg-slate-800/50 hover:text-fuchsia-400"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">About</span>
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-fuchsia-500/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-xs max-w-4xl mx-auto leading-relaxed">
            YGOLegacyEngine is an independent fan project and is not affiliated with or endorsed by Konami. All Yu-Gi-Oh! trademarks and images are property of Konami Digital Entertainment, used here for informational purposes only. Tournament data is compiled from official sources and community archives.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
