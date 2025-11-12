import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Master2PList = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardTypeFilter, setCardTypeFilter] = useState("");
  const [checkedCards, setCheckedCards] = useState({});

  useEffect(() => {
    fetchCards();
    loadCheckedCards();
  }, []);

  useEffect(() => {
    filterCards();
  }, [cards, searchTerm, cardTypeFilter]);

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
    if (window.confirm("Are you sure you want to clear all checked items?")) {
      saveCheckedCards({});
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
    const headers = ["Card Name", "Card Type", "Max Qty Needed", "Checkbox"];
    const rows = filteredCards.map((card) => [
      card.card_name,
      card.card_type,
      card.max_qty,
      card.checkbox,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "master_2p_inventory.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueCardTypes = [...new Set(cards.map((c) => c.card_type).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Master <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">2 Player</span> Inventory
        </h1>
        <p className="text-gray-400">Complete card inventory for Master 2 Player collection</p>
        <p className="text-sm text-gray-500 mt-2">{cards.length} cards total</p>
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

          {/* Download Button */}
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

        {/* Results Count */}
        <div className="text-sm text-gray-400">
          Showing <span className="text-white font-semibold">{filteredCards.length}</span> of{" "}
          <span className="text-white font-semibold">{cards.length}</span> cards
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Cards Table */}
      {!loading && filteredCards.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider\">\n                    #\n                  </th>
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
                    Checkbox
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {filteredCards.map((card, index) => (
                  <tr key={index} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {card.card_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded border bg-green-600/20 text-green-300 border-green-600/50">
                        {card.card_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-green-400">
                      {card.max_qty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-400">
                      {card.checkbox}
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
    </div>
  );
};

export default Master2PList;
