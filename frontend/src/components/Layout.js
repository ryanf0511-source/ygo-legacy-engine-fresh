import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950">
      {/* Navigation */}
      <nav className="bg-black/60 backdrop-blur-md border-b border-fuchsia-500/30 sticky top-0 z-50 shadow-lg shadow-fuchsia-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-amber-400 bg-clip-text text-transparent group-hover:from-amber-400 group-hover:via-fuchsia-400 group-hover:to-purple-400 transition-all duration-500">
                  YGO SJC Database
                </div>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive("/")
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/30"
                    : "text-gray-300 hover:bg-slate-800/50 hover:text-fuchsia-400"
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
      <footer className="bg-gray-800/30 backdrop-blur-md border-t border-purple-500/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">
            Yu-Gi-Oh! SJC Decklist Database - Featuring {"911"} tournament decklists and {"30,224"} card usage records
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
