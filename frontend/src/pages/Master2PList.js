import { useState, useEffect } from "react";
import axios from "axios";
import CardCheckbox from "@/components/CardCheckbox";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Master2PList = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardTypeFilter, setCardTypeFilter] = useState("");
  const [checkedCards, setCheckedCards] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 50;

  useEffect(() => {
    fetchCards();
    loadCheckedCards();
    
    // Add scroll listener for scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    filterCards();
  }, [cards, searchTerm, cardTypeFilter]);

  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, cardTypeFilter]);

  const loadCheckedCards = () => {
    const saved = localStorage.getItem("master2p_checked");
    if (saved) {
      try {
        setCheckedCards(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading checked cards:", e);
      }
    }
  };

  const saveCheckedCards = (newChecked) => {
    localStorage.setItem("master2p_checked", JSON.stringify(newChecked));
    setCheckedCards(newChecked);
  };

  const toggleCard = (cardName) => {
    const newChecked = { ...checkedCards };
    if (newChecked[cardName]) {
      delete newChecked[cardName];
    } else {
      newChecked[cardName] = true;
    }
    saveCheckedCards(newChecked);
  };

  const clearAllChecks = () => {
    const confirmed = window.confirm("Are you sure you want to reset all your progress? This will uncheck all cards.");
    if (confirmed) {
      saveCheckedCards({});
      // Force a re-render
      setCheckedCards({});
    }
  };

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/master-2p-list`);
      setCards(response.data.cards || []);
    } catch (error) {
      console.error("Error fetching Master 2P list:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterCards = () => {
    let filtered = [...cards];

    if (searchTerm) {
      filtered = filtered.filter((card) =>
        card.card_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (cardTypeFilter) {
      filtered = filtered.filter((card) => card.card_type === cardTypeFilter);
    }

    setFilteredCards(filtered);
  };

  const downloadCSV = () => {
    const headers = ["Card Name", "Card Type", "Max Qty Needed", "Have It"];
    const rows = filteredCards.map((card) => [
      // Escape double quotes and wrap fields in quotes if they contain commas or quotes
      `"${card.card_name.replace(/"/g, '""')}"`,
      `"${card.card_type.replace(/"/g, '""')}"`,
      card.max_qty,
      checkedCards[card.card_name] ? "Yes" : "No",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Master 2 Player List.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateProgress = () => {
    // Calculate total cards needed (sum of all max_qty)
    const totalCardsNeeded = cards.reduce((sum, card) => sum + card.max_qty, 0);
    
    // Calculate cards collected (sum of max_qty for checked cards)
    const cardsCollected = cards.reduce((sum, card) => {
      if (checkedCards[card.card_name]) {
        return sum + card.max_qty;
      }
      return sum;
    }, 0);
    
    return {
      collected: cardsCollected,
      total: totalCardsNeeded,
      percentage: totalCardsNeeded > 0 ? Math.round((cardsCollected / totalCardsNeeded) * 100) : 0,
    };
  };

  const progress = calculateProgress();

  const uniqueCardTypes = [...new Set(cards.map((c) => c.card_type).filter(Boolean))];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Master <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">2 Player</span> Inventory
        </h1>
        <p className="text-gray-400">Complete card inventory for Master 2 Player collection</p>
        <p className="text-sm text-gray-500 mt-2">{cards.length} cards total</p>
        
        {/* Legend/Instructions */}
        <div className="max-w-3xl mx-auto mt-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-4">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-11 bg-gray-700/50 rounded border border-purple-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-300">Click to check off</span>
            </div>
            <div className="text-gray-500">→</div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-11 bg-gradient-to-br from-purple-900/50 to-gray-900/50 rounded border border-purple-500/50 flex items-center justify-center">
                <span className="text-xs text-gray-500">YGO</span>
              </div>
              <span className="text-gray-300">Card back = Owned</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar - Gamified */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-sm font-medium text-gray-300">Collection Progress</span>
              <p className="text-xs text-gray-500 mt-1">
                {progress.collected} / {progress.total} cards collected
              </p>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-bold ${
                progress.percentage === 100 
                  ? 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent animate-pulse'
                  : 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
              }`}>
                {progress.percentage}%
              </span>
              {progress.percentage === 100 && (
                <p className="text-xs text-yellow-400 animate-bounce mt-1">🎉 COMPLETE!</p>
              )}
            </div>
          </div>
          
          <div className="relative w-full bg-gray-800/80 rounded-full h-8 overflow-visible border-2 border-gray-700 shadow-lg">
            {/* Millennium Item Milestones - 1/7 intervals */}
            {[
              { percent: 14.3, item: 1, name: "Millennium Ring" },
              { percent: 28.6, item: 2, name: "Millennium Scales" },
              { percent: 42.9, item: 3, name: "Millennium Eye" },
              { percent: 57.1, item: 4, name: "Millennium Rod" },
              { percent: 71.4, item: 5, name: "Millennium Key" },
              { percent: 85.7, item: 6, name: "Millennium Necklace" },
              { percent: 100, item: 7, name: "Millennium Puzzle" }
            ].map((milestone) => (
              <div
                key={milestone.item}
                className="absolute top-0 bottom-0 flex flex-col items-center justify-center"
                style={{ left: `${milestone.percent}%`, transform: 'translateX(-50%)' }}
              >
                {/* Millennium Item Icon */}
                <div className={`absolute -top-12 transition-all duration-500 ${
                  progress.percentage >= milestone.percent 
                    ? 'scale-110 opacity-100' 
                    : 'scale-90 opacity-40 grayscale'
                }`}>
                  <img 
                    src={`/millennium-${milestone.item}.png`}
                    alt={milestone.name}
                    className={`w-8 h-8 object-contain ${
                      progress.percentage >= milestone.percent 
                        ? 'animate-bounce drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' 
                        : ''
                    }`}
                    title={milestone.name}
                  />
                </div>
                {/* Vertical line marker */}
                <div className={`w-0.5 h-8 transition-all duration-500 ${
                  progress.percentage >= milestone.percent 
                    ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' 
                    : 'bg-gray-600'
                }`}></div>
              </div>
            ))}
            
            {/* Progress fill */}
            <div
              className="relative h-full rounded-full transition-all duration-700 ease-out overflow-hidden"
              style={{ 
                width: `${progress.percentage}%`,
                background: progress.percentage === 100 
                  ? 'linear-gradient(90deg, #fbbf24, #f59e0b, #eab308, #fbbf24)'
                  : progress.percentage >= 75 
                  ? 'linear-gradient(90deg, #a855f7, #ec4899, #f43f5e)'
                  : progress.percentage >= 50 
                  ? 'linear-gradient(90deg, #3b82f6, #8b5cf6, #a855f7)'
                  : progress.percentage >= 25
                  ? 'linear-gradient(90deg, #10b981, #06b6d4, #3b82f6)'
                  : 'linear-gradient(90deg, #10b981, #059669)',
                boxShadow: progress.percentage === 100
                  ? '0 0 30px rgba(251, 191, 36, 1), inset 0 2px 4px rgba(255, 255, 255, 0.4)'
                  : `0 0 ${Math.min(progress.percentage / 3, 20)}px ${
                      progress.percentage >= 75 ? 'rgba(168, 85, 247, 0.6)' :
                      progress.percentage >= 50 ? 'rgba(59, 130, 246, 0.6)' :
                      progress.percentage >= 25 ? 'rgba(6, 182, 212, 0.6)' :
                      'rgba(16, 185, 129, 0.6)'
                    }, inset 0 1px 2px rgba(255, 255, 255, 0.2)`,
                backgroundSize: progress.percentage === 100 ? '200% 100%' : '100% 100%',
                animation: progress.percentage === 100 ? 'gradientShift 2s ease infinite' : 'none'
              }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
              
              {/* Particle effects at milestones */}
              {progress.percentage >= 25 && progress.percentage < 100 && (
                <div className="absolute inset-0">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-float"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: '50%',
                        animationDelay: `${i * 0.5}s`,
                        opacity: 0.7
                      }}
                    ></div>
                  ))}
                </div>
              )}
              
              {/* 100% Celebration overlay */}
              {progress.percentage === 100 && (
                <div className="absolute inset-0 overflow-visible">
                  {/* Confetti particles */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 animate-confetti"
                      style={{
                        left: `${(i * 8) + 10}%`,
                        top: '50%',
                        animationDelay: `${i * 0.1}s`,
                        background: ['#fbbf24', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'][i % 5]
                      }}
                    ></div>
                  ))}
                  {/* Radial burst lines */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`burst-${i}`}
                      className="absolute w-0.5 h-8 bg-white/40 animate-burst"
                      style={{
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'center',
                        transform: `rotate(${i * 45}deg)`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Achievement message */}
          {progress.percentage >= 25 && progress.percentage < 100 && (
            <div className="text-center mt-3">
              <p className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {progress.percentage >= 75 ? "Almost there! You're a true collector! 👑" :
                 progress.percentage >= 50 ? "Halfway there! Keep going! 💎" :
                 "Great start! You've unlocked the first milestone! ⭐"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Filters and Download */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search card name..."
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Card Type Filter */}
          <select
            value={cardTypeFilter}
            onChange={(e) => setCardTypeFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Card Types</option>
            {uniqueCardTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={clearAllChecks}
              className="px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Reset Progress</span>
            </button>
            <button
              onClick={downloadCSV}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download CSV</span>
            </button>
          </div>
        </div>

      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Cards Table */}
      {!loading && filteredCards.length > 0 && (() => {
        // Pagination logic
        const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const currentCards = filteredCards.slice(startIndex, endIndex);
        
        return (
          <>
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900/50 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Card Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Card Type
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Max Qty Needed
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Have It?
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/30">
                    {currentCards.map((card, index) => {
                      const absoluteIndex = startIndex + index;
                      return (
                  <tr 
                    key={index} 
                    className={`hover:bg-gray-700/20 transition-colors ${
                      checkedCards[card.card_name] ? "bg-green-900/10" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {absoluteIndex + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {card.card_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded border ${
                        card.card_type === 'Monster' ? 'bg-orange-600/20 text-orange-300 border-orange-600/50' :
                        card.card_type === 'Spell' ? 'bg-green-600/20 text-green-300 border-green-600/50' :
                        card.card_type === 'Trap' ? 'bg-pink-600/20 text-pink-300 border-pink-600/50' :
                        'bg-gray-600/20 text-gray-300 border-gray-600/50'
                      }`}>
                        {card.card_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-green-400">
                      {card.max_qty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center">
                        <CardCheckbox
                          cardType={card.card_type}
                          cardSubtype={card.card_subtype}
                          isChecked={checkedCards[card.card_name] || false}
                          onChange={() => toggleCard(card.card_name)}
                        />
                      </div>
                    </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredCards.length)} of {filteredCards.length} cards
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center space-x-1 flex-wrap gap-1">
                      {Array.from({ length: totalPages }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })()}

      {/* No Results */}
      {!loading && filteredCards.length === 0 && (
        <div className="text-center py-12 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-purple-500/20">
          <p className="text-gray-400 text-lg">No cards found matching your filters.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setCardTypeFilter("");
            }}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-4 md:right-12 lg:right-20 p-4 bg-purple-600 text-white rounded-full shadow-2xl hover:bg-purple-700 transition-all duration-300 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Master2PList;
