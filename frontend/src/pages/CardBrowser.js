import { useState, useEffect } from "react";
import axios from "axios";
import DecklistSidePanel from "@/components/DecklistSidePanel";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CardBrowser = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardTypeFilter, setCardTypeFilter] = useState("");
  const [mainExtraFilter, setMainExtraFilter] = useState("");
  const [deckNameFilter, setDeckNameFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [quantityFilter, setQuantityFilter] = useState("");
  const [pageSize] = useState(50);
  const [selectedDecklistId, setSelectedDecklistId] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, [page, searchTerm, cardTypeFilter, mainExtraFilter, deckNameFilter, eventFilter, quantityFilter]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const params = { page, page_size: pageSize };
      if (searchTerm) params.search = searchTerm;
      if (cardTypeFilter) params.card_type = cardTypeFilter;
      if (mainExtraFilter) params.main_extra = mainExtraFilter;
      if (deckNameFilter) params.deck_name = deckNameFilter;
      if (eventFilter) params.event = eventFilter;
      if (quantityFilter) params.quantity = quantityFilter;

      const response = await axios.get(`${API}/card-records`, { params });
      
      // Apply multi-level sorting client-side
      const sortedRecords = (response.data.items || []).sort((a, b) => {
        // Extract year from event (e.g., "SJC Houston 2008" -> 2008)
        const yearA = parseInt(a.event.match(/\d{4}/)?.[0] || "0");
        const yearB = parseInt(b.event.match(/\d{4}/)?.[0] || "0");
        
        // 1. Sort by Year (ascending)
        if (yearA !== yearB) return yearA - yearB;
        
        // 2. Sort by Deck Name (ascending)
        const deckCompare = `${a.player_name}-${a.deck_name}`.localeCompare(`${b.player_name}-${b.deck_name}`);
        if (deckCompare !== 0) return deckCompare;
        
        // 3. Sort by Main/Extra (ascending - Extra before Main alphabetically)
        const mainExtraCompare = a.main_extra.localeCompare(b.main_extra);
        if (mainExtraCompare !== 0) return mainExtraCompare;
        
        // 4. Sort by Card Type (ascending)
        const cardTypeCompare = (a.card_type || "").localeCompare(b.card_type || "");
        if (cardTypeCompare !== 0) return cardTypeCompare;
        
        // 5. Sort by Card Name (ascending)
        return a.card_name.localeCompare(b.card_name);
      });
      
      setRecords(sortedRecords);
      setTotal(response.data.total);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching card records:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCardTypeColor = (type) => {
    const typeColors = {
      Monster: "bg-orange-600/30 text-orange-300 border-orange-600/50",
      Spell: "bg-green-600/30 text-green-300 border-green-600/50",
      Trap: "bg-pink-600/30 text-pink-300 border-pink-600/50",
    };
    return typeColors[type] || "bg-gray-600/30 text-gray-300 border-gray-600/50";
  };

  const getMainExtraColor = (mainExtra) => {
    return mainExtra === "Main" 
      ? "bg-red-600/30 text-red-300 border-red-600/50"
      : "bg-blue-600/30 text-blue-300 border-blue-600/50";
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCardTypeFilter("");
    setMainExtraFilter("");
    setDeckNameFilter("");
    setEventFilter("");
    setPage(1);
  };

  const hasActiveFilters = searchTerm || cardTypeFilter || mainExtraFilter || deckNameFilter || eventFilter;

  return (
    <div className="space-y-6">
      {/* Header - Notion Style */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          YGO SJC Card Usage Database
        </h1>
        <p className="text-gray-400 text-sm">Individual card usage records across all tournaments</p>
      </div>

      {/* Search and Filters - Notion Style */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700/50 p-4 space-y-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search card name..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white text-sm placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setPage(1);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={cardTypeFilter}
            onChange={(e) => {
              setCardTypeFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-md text-white focus:ring-1 focus:ring-purple-500"
          >
            <option value="">All Card Types</option>
            <option value="Monster">Monster</option>
            <option value="Spell">Spell</option>
            <option value="Trap">Trap</option>
          </select>

          <select
            value={mainExtraFilter}
            onChange={(e) => {
              setMainExtraFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-md text-white focus:ring-1 focus:ring-purple-500"
          >
            <option value="">All Locations</option>
            <option value="Main">Main Deck</option>
            <option value="Extra">Extra Deck</option>
          </select>

          <input
            type="text"
            value={deckNameFilter}
            onChange={(e) => {
              setDeckNameFilter(e.target.value);
              setPage(1);
            }}
            placeholder="Filter by deck/player..."
            className="px-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-1 focus:ring-purple-500"
          />

          <input
            type="text"
            value={eventFilter}
            onChange={(e) => {
              setEventFilter(e.target.value);
              setPage(1);
            }}
            placeholder="Filter by event..."
            className="px-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-400">
          Showing <span className="text-white font-semibold">{records.length}</span> of{" "}
          <span className="text-white font-semibold">{total.toLocaleString()}</span> records
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      )}

      {/* Table - Notion Style */}
      {!loading && records.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-900/50 border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Player Name/Deck Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Card Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Card Type
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Main/Extra
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Card ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Decklist
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {records.map((record, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-200">
                      {record.player_name}-{record.deck_name}
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-xs">
                      {record.event}
                    </td>
                    <td className="px-4 py-3 text-white font-medium">
                      {record.card_name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                          getCardTypeColor(record.card_type)
                        }`}
                      >
                        {record.card_type || "Unknown"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-white">
                      {record.quantity}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                          getMainExtraColor(record.main_extra)
                        }`}
                      >
                        {record.main_extra}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {record.card_id || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {record.decklist_id ? (
                        <button
                          onClick={() => setSelectedDecklistId(record.decklist_id)}
                          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="text-xs">
                            {record.player_name}-{record.deck_name}
                          </span>
                        </button>
                      ) : (
                        <span className="text-gray-500 text-xs">No link</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && records.length === 0 && (
        <div className="text-center py-12 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50">
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
          <p className="text-gray-400 text-lg mt-4">No records found matching your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination - Notion Style */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Page {page} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Side Panel for Decklist */}
      <DecklistSidePanel
        decklistId={selectedDecklistId}
        onClose={() => setSelectedDecklistId(null)}
      />
    </div>
  );
};

export default CardBrowser;
