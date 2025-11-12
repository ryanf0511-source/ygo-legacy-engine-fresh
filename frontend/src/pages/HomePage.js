import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdvancedFilters from "@/components/AdvancedFilters";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [decklists, setDecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    player_name: "",
    deck_types: [],
    events: [],
    search: "",
  });
  const [sortBy, setSortBy] = useState("player_name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchDecklists();
  }, [page, filters, sortBy, sortOrder]);

  const fetchDecklists = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        page_size: 20,
        sort_by: sortBy,
        sort_order: sortOrder,
      };

      if (filters.player_name) params.player_name = filters.player_name;
      if (filters.deck_types && filters.deck_types.length > 0)
        params.deck_types = filters.deck_types.join(",");
      if (filters.events && filters.events.length > 0)
        params.events = filters.events.join(",");
      if (filters.search) params.search = filters.search;

      const response = await axios.get(`${API}/decklists`, { params });
      setDecklists(response.data.items);
      setTotalPages(response.data.total_pages);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching decklists:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const calculateTotalCards = (cards) => {
    return cards?.reduce((sum, card) => sum + (card.quantity || 0), 0) || 0;
  };

  const DecklistCard = ({ decklist }) => (
    <Link
      to={`/decklist/${decklist.id}`}
      className="block bg-gray-800/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-5 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
            {decklist.player_name}
          </h3>
          <p className="text-purple-400 text-sm mt-1 font-medium">
            {decklist.deck_name}
          </p>
          <p className="text-gray-400 text-xs mt-2">{decklist.event}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="text-xs">Main:</span>
              <span className="font-semibold text-purple-400">
                {calculateTotalCards(decklist.main_deck)}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs">Extra:</span>
              <span className="font-semibold text-blue-400">
                {calculateTotalCards(decklist.extra_deck)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Yu-Gi-Oh! SJC <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Decklist Database</span>
        </h1>
        <p className="text-gray-400">Browse and search through tournament-winning decklists</p>
        <p className="text-sm text-gray-500 mt-2">
          💡 Tip: Looking for specific cards? Check out the <Link to="/cards" className="text-purple-400 hover:text-purple-300 underline">Card Browser</Link> tab!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <AdvancedFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          {/* Sort Controls */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-sm text-gray-400">
                Showing <span className="text-white font-semibold">{decklists.length}</span> of{" "}
                <span className="text-white font-semibold">{total}</span> decklists
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <button
                  onClick={() => handleSort("player_name")}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    sortBy === "player_name"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Player {sortBy === "player_name" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                  onClick={() => handleSort("deck_name")}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    sortBy === "deck_name"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Deck {sortBy === "deck_name" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                  onClick={() => handleSort("event")}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    sortBy === "event"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Event {sortBy === "event" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}

          {/* Decklists Grid */}
          {!loading && decklists.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {decklists.map((decklist) => (
                <DecklistCard key={decklist.id} decklist={decklist} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && decklists.length === 0 && (
            <div className="text-center py-12 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-purple-500/20">
              <p className="text-gray-400 text-lg">No decklists found matching your filters.</p>
              <button
                onClick={() => handleFilterChange({
                  player_name: "",
                  deck_types: [],
                  events: [],
                  search: "",
                })}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
              <span className="text-gray-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
