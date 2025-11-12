import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CardBrowser = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardTypeFilter, setCardTypeFilter] = useState("all");
  const [mainExtraFilter, setMainExtraFilter] = useState("all");
  const [sortBy, setSortBy] = useState("deck_count");
  const [limit, setLimit] = useState(100);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, [limit, mainExtraFilter]);

  useEffect(() => {
    filterCards();
  }, [cards, searchTerm, cardTypeFilter]);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const params = { limit };
      if (mainExtraFilter !== "all") {
        params.main_extra = mainExtraFilter === "main" ? "Main" : "Extra";
      }
      const response = await axios.get(`${API}/card-usage`, { params });
      setCards(response.data.cards || []);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterCards = () => {
    let filtered = [...cards];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((card) =>
        card.card_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by card type
    if (cardTypeFilter !== "all") {
      filtered = filtered.filter(
        (card) => card.card_type?.toLowerCase() === cardTypeFilter.toLowerCase()
      );
    }

    // Sort
    if (sortBy === "deck_count") {
      filtered.sort((a, b) => b.deck_count - a.deck_count);
    } else if (sortBy === "total_copies") {
      filtered.sort((a, b) => b.total_copies - a.total_copies);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.card_name.localeCompare(b.card_name));
    }

    setFilteredCards(filtered);
  };

  const getCardTypeColor = (type) => {
    const typeColors = {
      Monster: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      Spell: "bg-green-500/20 text-green-400 border-green-500/30",
      Trap: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    };
    return typeColors[type] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const uniqueCardTypes = [...new Set(cards.map((c) => c.card_type).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Card <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Browser</span>
        </h1>
        <p className="text-gray-400">Search and explore individual card usage across all tournaments</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search Card Name
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type card name..."
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Card Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Card Type
            </label>
            <select
              value={cardTypeFilter}
              onChange={(e) => setCardTypeFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              {uniqueCardTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Main/Extra Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Deck Location
            </label>
            <select
              value={mainExtraFilter}
              onChange={(e) => setMainExtraFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Cards</option>
              <option value="main">Main Deck Only</option>
              <option value="extra">Extra Deck Only</option>
            </select>
          </div>
        </div>

        {/* Sort and Limit Controls */}
        <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-700 gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Sort by:</span>
            <button
              onClick={() => setSortBy("deck_count")}
              className={`px-3 py-1 rounded text-sm transition-all ${
                sortBy === "deck_count"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Popularity
            </button>
            <button
              onClick={() => setSortBy("total_copies")}
              className={`px-3 py-1 rounded text-sm transition-all ${
                sortBy === "total_copies"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Total Copies
            </button>
            <button
              onClick={() => setSortBy("name")}
              className={`px-3 py-1 rounded text-sm transition-all ${
                sortBy === "name"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Name A-Z
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Show:</span>
            <select
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="50">Top 50</option>
              <option value="100">Top 100</option>
              <option value="200">Top 200</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Showing <span className="text-white font-semibold">{filteredCards.length}</span> cards
            {searchTerm && (
              <span>
                {" "}
                matching <span className="text-purple-400 font-semibold">"{searchTerm}"</span>
              </span>
            )}
          </p>
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
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Card Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Decks Using
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Total Copies
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Avg per Deck
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredCards.map((card, index) => {
                  const avgPerDeck = (card.total_copies / card.deck_count).toFixed(2);
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {card.card_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded border ${
                            getCardTypeColor(card.card_type)
                          }`}
                        >
                          {card.card_type || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-bold text-purple-400">
                          {card.deck_count}
                        </div>
                        <div className="text-xs text-gray-500">decks</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-semibold text-blue-400">
                          {card.total_copies}
                        </div>
                        <div className="text-xs text-gray-500">copies</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-300">{avgPerDeck}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredCards.length === 0 && (
        <div className="text-center py-12 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-purple-500/20">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-400 text-lg mt-4">No cards found matching your filters.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setCardTypeFilter("all");
            }}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CardBrowser;
