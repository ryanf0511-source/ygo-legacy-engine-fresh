import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const StatsPage = () => {
  const [stats, setStats] = useState(null);
  const [cardUsage, setCardUsage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardLimit, setCardLimit] = useState(50);
  const [cardFilter, setCardFilter] = useState("all");

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchCardUsage();
  }, [cardLimit, cardFilter]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCardUsage = async () => {
    try {
      const params = { limit: cardLimit };
      if (cardFilter !== "all") {
        params.main_extra = cardFilter === "main" ? "Main" : "Extra";
      }
      const response = await axios.get(`${API}/card-usage`, { params });
      setCardUsage(response.data.cards);
    } catch (error) {
      console.error("Error fetching card usage:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Database <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Statistics</span>
        </h1>
        <p className="text-gray-400">Insights and trends from the tournament scene</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-md rounded-xl border border-purple-500/30 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Total Decklists</p>
              <p className="text-4xl font-bold text-white mt-2">{stats?.total_decks || 0}</p>
            </div>
            <svg
              className="w-12 h-12 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md rounded-xl border border-blue-500/30 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Total Events</p>
              <p className="text-4xl font-bold text-white mt-2">{stats?.total_events || 0}</p>
            </div>
            <svg
              className="w-12 h-12 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md rounded-xl border border-green-500/30 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Total Players</p>
              <p className="text-4xl font-bold text-white mt-2">{stats?.total_players || 0}</p>
            </div>
            <svg
              className="w-12 h-12 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Top Deck Types */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Top Deck Types</h2>
        <div className="space-y-3">
          {stats?.deck_types?.slice(0, 10).map((deck, index) => {
            const maxCount = stats.deck_types[0]?.count || 1;
            const percentage = (deck.count / maxCount) * 100;
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 font-medium">{deck.deck_type}</span>
                  <span className="text-purple-400 font-semibold">{deck.count} decks</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popular Cards */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Most Popular Cards</h2>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-400">Filter:</label>
            <select
              value={cardFilter}
              onChange={(e) => setCardFilter(e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Cards</option>
              <option value="main">Main Deck</option>
              <option value="extra">Extra Deck</option>
            </select>
            <label className="text-sm text-gray-400">Show:</label>
            <select
              value={cardLimit}
              onChange={(e) => setCardLimit(parseInt(e.target.value))}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="20">Top 20</option>
              <option value="50">Top 50</option>
              <option value="100">Top 100</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cardUsage.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="text-gray-200 font-medium">{card.card_name}</p>
                  <p className="text-gray-400 text-xs">{card.card_type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-400 font-semibold">{card.deck_count} decks</p>
                <p className="text-gray-400 text-xs">{card.total_copies} copies</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
