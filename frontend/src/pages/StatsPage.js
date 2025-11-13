import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const COLORS = {
  Monster: "#FF8C42",
  Spell: "#4ADE80",
  Trap: "#F472B6",
  Fusion: "#A855F7",
  Synchro: "#E0E0E0"
};

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
        params.card_type = cardFilter;
      }
      const response = await axios.get(`${API}/card-usage`, { params });
      setCardUsage(response.data.cards);
    } catch (error) {
      console.error("Error fetching card usage:", error);
    }
  };

  // Prepare pie chart data
  const getPieChartData = () => {
    if (!stats?.card_type_distribution) return [];
    return Object.entries(stats.card_type_distribution).map(([name, value]) => ({
      name,
      value,
      color: COLORS[name] || "#888888"
    }));
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
        <p className="text-gray-400">Insights and trends from SJC history (2004-2010)</p>
      </div>

      {/* Card Type Distribution Pie Chart */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Card Type Distribution</h2>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={getPieChartData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {getPieChartData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #4b5563',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Successful Decks */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Most Successful Players</h2>
        <p className="text-gray-400 text-sm mb-4">Players with the most Top 8 appearances in SJC history</p>
        <div className="space-y-3">
          {stats?.most_successful_decks?.map((player, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                  index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                  index === 1 ? 'bg-gray-400/20 text-gray-300' :
                  index === 2 ? 'bg-orange-600/20 text-orange-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="text-gray-200 font-bold">{player.player_name}</p>
                  <p className="text-gray-400 text-sm">{player.deck_name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-400 font-bold text-lg">{player.appearances}</p>
                <p className="text-gray-400 text-xs">appearances</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Cards */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h2 className="text-2xl font-bold text-white">Most Popular Cards</h2>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm text-gray-400">Filter:</label>
            <select
              value={cardFilter}
              onChange={(e) => setCardFilter(e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Cards</option>
              <option value="Monster">Monsters</option>
              <option value="Spell">Spells</option>
              <option value="Trap">Traps</option>
              <option value="Fusion">Fusions</option>
              <option value="Synchro">Synchros</option>
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
                  <span 
                    className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: `${COLORS[card.card_type]}30`,
                      color: COLORS[card.card_type]
                    }}
                  >
                    {card.card_type}
                  </span>
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
