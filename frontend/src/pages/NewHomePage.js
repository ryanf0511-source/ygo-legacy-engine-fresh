import { Link } from "react-router-dom";

const NewHomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Museum Lighting */}
      <section className="relative overflow-hidden py-24 px-6">
        {/* Museum spotlight effect */}
        <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" style={{
          background: 'radial-gradient(ellipse 800px 600px at 50% -100px, rgba(244, 244, 244, 0.03), transparent)'
        }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Golden Frame Title Card */}
          <div className="relative">
            {/* Subtle holographic accent on frame */}
            <div className="absolute inset-0 rounded-lg opacity-15 holographic-frame-glow"></div>
            
            {/* Main frame */}
            <div className="relative marble-panel-hero border-2 border-gold-foil rounded-lg p-12 shadow-2xl shadow-black/60">
              {/* Egyptian corner ornaments */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold-foil opacity-60"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold-foil opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold-foil opacity-60"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold-foil opacity-60"></div>
              
              <div className="text-center space-y-6">
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-off-white leading-tight">
                  Explore the Complete History of
                  <span className="block mt-2 text-gold-foil">Yu-Gi-Oh! SJC Tournaments</span>
                </h1>
                
                <p className="text-xl text-soft-grey max-w-3xl mx-auto leading-relaxed">
                  Decklists, card usage, meta trends, and more from 2004–2010.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex justify-center gap-6 pt-8">
                  <Link
                    to="/cards"
                    className="group relative px-8 py-4 bg-transparent border-2 border-gold-foil rounded hover:shadow-lg hover:shadow-gold-glow/20 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 holographic-shimmer-subtle"></div>
                    <span className="relative z-10 text-gold-foil font-medium tracking-wide">Browse Cards</span>
                  </Link>
                  
                  <Link
                    to="/decklists"
                    className="group relative px-8 py-4 bg-transparent border-2 border-gold-foil rounded hover:shadow-lg hover:shadow-gold-glow/20 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 holographic-shimmer-subtle"></div>
                    <span className="relative z-10 text-gold-foil font-medium tracking-wide">View Decklists</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid - 6 Uniform Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Card Browser */}
          <Link to="/cards" className="feature-card group">
            <div className="feature-card-content">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-black/30 border border-white-vein/20">
                  <svg className="w-12 h-12 text-soft-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-serif font-semibold text-off-white mb-3 text-center">Card Browser</h3>
              
              {/* Description */}
              <p className="text-sm text-soft-grey text-center leading-relaxed">
                Search and explore 30,224 card usage records across all SJC tournaments
              </p>
            </div>
          </Link>

          {/* Card 2: Decklists */}
          <Link to="/decklists" className="feature-card group">
            <div className="feature-card-content">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-black/30 border border-white-vein/20">
                  <svg className="w-12 h-12 text-soft-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-semibold text-off-white mb-3 text-center">Decklists</h3>
              
              <p className="text-sm text-soft-grey text-center leading-relaxed">
                Browse 911 tournament-winning decklists with complete card listings
              </p>
            </div>
          </Link>

          {/* Card 3: Master Lists */}
          <Link to="/master-lists" className="feature-card group">
            <div className="feature-card-content">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-black/30 border border-white-vein/20">
                  <svg className="w-12 h-12 text-soft-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-semibold text-off-white mb-3 text-center">Master Lists</h3>
              
              <p className="text-sm text-soft-grey text-center leading-relaxed">
                Track your collection with comprehensive card checklists
              </p>
            </div>
          </Link>

          {/* Card 4: Head-to-Head */}
          <Link to="/head-to-head" className="feature-card group">
            <div className="feature-card-content">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-black/30 border border-white-vein/20">
                  <svg className="w-12 h-12 text-soft-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-semibold text-off-white mb-3 text-center">Head-to-Head</h3>
              
              <p className="text-sm text-soft-grey text-center leading-relaxed">
                Build matchups with historical tournament decklists
              </p>
            </div>
          </Link>

          {/* Card 5: Statistics */}
          <Link to="/stats" className="feature-card group">
            <div className="feature-card-content">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-black/30 border border-white-vein/20">
                  <svg className="w-12 h-12 text-soft-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-semibold text-off-white mb-3 text-center">Statistics</h3>
              
              <p className="text-sm text-soft-grey text-center leading-relaxed">
                Analyze meta trends and deck popularity over time
              </p>
            </div>
          </Link>

          {/* Card 6: Community */}
          <Link to="/schedule" className="feature-card group">
            <div className="feature-card-content">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-black/30 border border-white-vein/20">
                  <svg className="w-12 h-12 text-soft-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-semibold text-off-white mb-3 text-center">Community</h3>
              
              <p className="text-sm text-soft-grey text-center leading-relaxed">
                Join live streams and connect with fellow duelists
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold-foil/30 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-center text-off-white/70 text-sm">
            Yu-Gi-Oh! SJC Database © {new Date().getFullYear()} | Preserving competitive history from 2004–2010
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NewHomePage;
