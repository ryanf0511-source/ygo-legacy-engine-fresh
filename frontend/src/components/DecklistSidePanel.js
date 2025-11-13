import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DecklistSidePanel = ({ decklistId, onClose }) => {
  const [decklist, setDecklist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (decklistId) {
      fetchDecklist();
    }
  }, [decklistId]);

  const fetchDecklist = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/decklists/${decklistId}`);
      setDecklist(response.data);
    } catch (error) {
      console.error("Error fetching decklist:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCards = (cards) => {
    return cards?.reduce((sum, card) => sum + (card.quantity || 0), 0) || 0;
  };

  if (!decklistId) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-1/3 bg-gray-900 border-l border-gray-700 shadow-2xl z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white truncate">
          {loading ? "Loading..." : decklist?.player_name}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : decklist ? (
        <div className="p-6 space-y-6">
          {/* Deck Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{decklist.player_name}</h3>
            <p className="text-purple-400 font-medium">{decklist.deck_name}</p>
            <p className="text-gray-400 text-sm mt-1">{decklist.event}</p>
          </div>

          {/* Deck Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">
                {calculateTotalCards(decklist.main_deck)}
              </div>
              <div className="text-xs text-gray-400">Main Deck</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">
                {calculateTotalCards(decklist.extra_deck)}
              </div>
              <div className="text-xs text-gray-400">Extra Deck</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
              <div className="text-xl font-bold text-green-400">
                {calculateTotalCards(decklist.side_deck)}
              </div>
              <div className="text-xs text-gray-400">Side Deck</div>
            </div>
          </div>

          {/* Main Deck */}
          {decklist.main_deck && decklist.main_deck.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Main Deck — Monsters
              </h4>
              <div className="space-y-1">
                {decklist.main_deck
                  .filter((card) => !card.card_type || card.card_type === "Monster")
                  .map((card, index) => (
                    <div key={index} className="text-sm text-gray-300">
                      {card.quantity}x {card.name}
                    </div>
                  ))}
              </div>

              <h4 className="text-sm font-semibold text-gray-300 mt-4 mb-3 uppercase tracking-wider">
                Main Deck — Spells
              </h4>
              <div className="space-y-1">
                {decklist.main_deck
                  .filter((card) => card.card_type === "Spell")
                  .map((card, index) => (
                    <div key={index} className="text-sm text-gray-300">
                      {card.quantity}x {card.name}
                    </div>
                  ))}
              </div>

              <h4 className="text-sm font-semibold text-gray-300 mt-4 mb-3 uppercase tracking-wider">
                Main Deck — Traps
              </h4>
              <div className="space-y-1">
                {decklist.main_deck
                  .filter((card) => card.card_type === "Trap")
                  .map((card, index) => (
                    <div key={index} className="text-sm text-gray-300">
                      {card.quantity}x {card.name}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Extra Deck */}
          {decklist.extra_deck && decklist.extra_deck.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Extra Deck
              </h4>
              <div className="space-y-1">
                {decklist.extra_deck.map((card, index) => (
                  <div key={index} className="text-sm text-gray-300">
                    {card.quantity}x {card.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-400">
          Decklist not found
        </div>
      )}
    </div>
  );
};

export default DecklistSidePanel;
