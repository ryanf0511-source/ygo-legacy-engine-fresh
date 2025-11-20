import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen obsidian-marble-bg">
      {/* Header with transparent marble effect */}
      <nav className="relative border-b border-gold-foil/30 backdrop-blur-md bg-marble-black/75 sticky top-0 z-50">
        {/* Subtle holographic shimmer on bottom border hover */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-foil/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-20">
            <Link to="/" className="group">
              <h1 className="font-serif text-3xl font-bold text-off-white group-hover:text-gold-foil transition-colors duration-300">
                YGO SJC Database
              </h1>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
