import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-stone-950">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-stone-950/95 via-neutral-950/95 to-stone-950/95 border-b-2 border-yellow-600/40 sticky top-0 z-50 shadow-lg shadow-yellow-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:via-amber-400 group-hover:to-yellow-500 transition-all duration-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                  YGO SJC Database
                </div>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive("/")
                    ? "bg-gradient-to-r from-yellow-600 to-amber-600 text-black font-semibold shadow-lg shadow-yellow-900/40"
                    : "text-gray-300 hover:bg-stone-800/50 hover:text-yellow-400"
                }`}
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-stone-950/90 via-neutral-950/90 to-stone-950/90 border-t-2 border-yellow-600/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">
            Yu-Gi-Oh! SJC Decklist Database - Featuring <span className="text-yellow-400 font-semibold">911</span> tournament decklists and <span className="text-emerald-400 font-semibold">30,224</span> card usage records
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
