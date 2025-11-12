import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdvancedFilters = ({ onFilterChange, filters }) => {
  const [deckTypes, setDeckTypes] = useState([]);
  const [events, setEvents] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const [deckTypesRes, eventsRes] = await Promise.all([
        axios.get(`${API}/deck-types`),
        axios.get(`${API}/events`),
      ]);
      setDeckTypes(deckTypesRes.data.deck_types);
      setEvents(eventsRes.data.events);
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const handleDeckTypeToggle = (deckType) => {
    const current = filters.deck_types || [];
    const updated = current.includes(deckType)
      ? current.filter((dt) => dt !== deckType)
      : [...current, deckType];
    onFilterChange({ ...filters, deck_types: updated });
  };

  const handleEventToggle = (event) => {
    const current = filters.events || [];
    const updated = current.includes(event)
      ? current.filter((e) => e !== event)
      : [...current, event];
    onFilterChange({ ...filters, events: updated });
  };

  const clearFilters = () => {
    onFilterChange({
      player_name: "",
      deck_types: [],
      events: [],
      search: "",
    });
  };

  const hasActiveFilters =
    filters.player_name ||
    (filters.deck_types && filters.deck_types.length > 0) ||
    (filters.events && filters.events.length > 0) ||
    filters.search;

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <svg
            className="w-6 h-6 mr-2 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          Filters
        </h2>
        <div className="flex space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 text-sm bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      {/* Basic Search */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quick Search (Player, Deck, Event)
          </label>
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            placeholder="Search across all fields..."
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {isExpanded && (
          <>
            {/* Player Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Player Name
              </label>
              <input
                type="text"
                value={filters.player_name || ""}
                onChange={(e) =>
                  onFilterChange({ ...filters, player_name: e.target.value })
                }
                placeholder="Enter player name..."
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Deck Types */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Deck Types ({filters.deck_types?.length || 0} selected)
              </label>
              <div className="max-h-48 overflow-y-auto bg-gray-700/30 rounded-lg p-3 space-y-2 border border-gray-600">
                {deckTypes.map((deckType) => (
                  <label
                    key={deckType}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-600/30 p-2 rounded transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={(filters.deck_types || []).includes(deckType)}
                      onChange={() => handleDeckTypeToggle(deckType)}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-300">{deckType}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Events ({filters.events?.length || 0} selected)
              </label>
              <div className="max-h-48 overflow-y-auto bg-gray-700/30 rounded-lg p-3 space-y-2 border border-gray-600">
                {events.map((event) => (
                  <label
                    key={event}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-600/30 p-2 rounded transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={(filters.events || []).includes(event)}
                      onChange={() => handleEventToggle(event)}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-300">{event}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">
                Search: {filters.search}
              </span>
            )}
            {filters.player_name && (
              <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">
                Player: {filters.player_name}
              </span>
            )}
            {(filters.deck_types || []).map((dt) => (
              <span
                key={dt}
                className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded"
              >
                {dt}
              </span>
            ))}
            {(filters.events || []).map((e) => (
              <span
                key={e}
                className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded"
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;
