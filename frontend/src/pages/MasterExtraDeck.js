import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MasterExtraDeck = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedCards, setCheckedCards] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchCards();
    loadCheckedCards();
    
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    filterCards();
  }, [cards, searchTerm]);

  const loadCheckedCards = () => {
    const saved = localStorage.getItem("master_extra_deck_checked");
    if (saved) {
      try {
        setCheckedCards(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading checked cards:", e);
      }
    }
  };

  const saveCheckedCards = (newChecked) => {
    localStorage.setItem("master_extra_deck_checked", JSON.stringify(newChecked));
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
      setCheckedCards({});
    }
  };

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/master-extra-deck-list`);
      setCards(response.data.cards || []);
    } catch (error) {
      console.error("Error fetching Extra Deck list:", error);
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

    setFilteredCards(filtered);
  };

  const downloadCSV = () => {
    const headers = ["Card Name", "Card Type", "Max Qty Needed", "Have It"];
    const rows = filteredCards.map((card) => [
      card.card_name,
      card.card_type,
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
    link.setAttribute("download", "master_extra_deck_inventory.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateProgress = () => {
    const totalCardsNeeded = cards.reduce((sum, card) => sum + card.max_qty, 0);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          SJC Master <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Extra Deck</span> List
        </h1>
        <p className="text-gray-400">Extra Deck / Fusion card inventory (2005-2010 SJC era)</p>
        <p className="text-sm text-gray-500 mt-2">{cards.length} unique cards</p>
        
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Collection Progress</span>
            <span className="text-lg font-bold text-purple-400">
              {progress.percentage}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Filters and Download */}
      <div className="bg-slate-900/50 backdrop-blur-md rounded-xl border border-fuchsia-500/30 p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search card name..."
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

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
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
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

        {/* Results Count */}
        <div className="text-sm text-gray-400">
          Showing <span className="text-white font-semibold">{filteredCards.length}</span> of{" "}
          <span className="text-white font-semibold">{cards.length}</span> cards
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      )}

      {/* Cards Table */}
      {!loading && filteredCards.length > 0 && (
        <div className="bg-slate-900/50 backdrop-blur-md rounded-xl border border-fuchsia-500/30 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/40 border-b border-gray-700">
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
                {filteredCards.map((card, index) => (
                  <tr 
                    key={index} 
                    className={`hover:bg-gray-700/20 transition-colors ${
                      checkedCards[card.card_name] ? "bg-purple-900/10" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {card.card_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded border ${
                        card.card_type === 'Fusion' ? 'bg-purple-600/20 text-purple-300 border-purple-600/50' :
                        card.card_type === 'Synchro' ? 'bg-white/20 text-white border-white/50' :
                        'bg-gray-600/20 text-gray-300 border-gray-600/50'
                      }`}>
                        {card.card_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-purple-400">
                      {card.max_qty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={checkedCards[card.card_name] || false}
                        onChange={() => toggleCard(card.card_name)}
                        className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredCards.length === 0 && (
        <div className="text-center py-12 bg-slate-900/50 backdrop-blur-sm rounded-lg border border-fuchsia-500/30">
          <p className="text-gray-400 text-lg">No cards found matching your filters.</p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-4 md:right-12 lg:right-20 p-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-full shadow-2xl hover:from-fuchsia-500 hover:to-purple-500 transition-all duration-300 hover:scale-110 z-50"
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

export default MasterExtraDeck;
