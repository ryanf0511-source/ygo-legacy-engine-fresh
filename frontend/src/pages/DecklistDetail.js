import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DecklistDetail = () => {
  const { id } = useParams();
  const [decklist, setDecklist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("main");

  useEffect(() => {
    fetchDecklist();
  }, [id]);

  const fetchDecklist = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/decklists/${id}`);
      setDecklist(response.data);
    } catch (error) {
      console.error("Error fetching decklist:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCards = (cards) => {
    return cards.reduce((sum, card) => sum + card.quantity, 0);
  };

  const CardList = ({ cards, title }) => {
    if (!cards || cards.length === 0) {
      return <p className="text-gray-400 text-center py-4">No cards in {title}</p>;
    }

    // For Main Deck, organize by card type
    if (title === "Main Deck") {
      const monsters = cards.filter((card) => !card.card_type || card.card_type === "Monster");
      const spells = cards.filter((card) => card.card_type === "Spell");
      const traps = cards.filter((card) => card.card_type === "Trap");

      return (
        <div className="space-y-6">
          {monsters.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Monsters
              </h4>
              <div className="space-y-1">
                {monsters.map((card, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="text-gray-200">{card.name}</span>
                    <span className="text-purple-400 font-semibold">×{card.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {spells.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Spells
              </h4>
              <div className="space-y-1">
                {spells.map((card, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="text-gray-200">{card.name}</span>
                    <span className="text-purple-400 font-semibold">×{card.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {traps.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Traps
              </h4>
              <div className="space-y-1">
                {traps.map((card, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="text-gray-200">{card.name}</span>
                    <span className="text-purple-400 font-semibold">×{card.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // For Extra Deck, show as is
    return (
      <div className="space-y-1">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <span className="text-gray-200">{card.name}</span>
            <span className="text-purple-400 font-semibold">×{card.quantity}</span>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!decklist) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Decklist not found</p>
        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Back to Decklists
        </Link>
      </div>
    );
  }

  const mainDeckTotal = calculateTotalCards(decklist.main_deck || []);
  const extraDeckTotal = calculateTotalCards(decklist.extra_deck || []);
  const sideDeckTotal = calculateTotalCards(decklist.side_deck || []);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Decklists
      </Link>

      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-2">{decklist.player_name}</h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-300">
          <div className="flex items-center">
            <span className="text-purple-400 font-semibold text-xl">{decklist.deck_name}</span>
          </div>
          <div className="h-6 w-px bg-gray-600"></div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-gray-400"
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
            {decklist.event}
          </div>
        </div>

        {/* Deck Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{mainDeckTotal}</div>
            <div className="text-sm text-gray-400">Main Deck Cards</div>
          </div>
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{extraDeckTotal}</div>
            <div className="text-sm text-gray-400">Extra Deck Cards</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab("main")}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === "main"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            Main Deck
          </button>
          <button
            onClick={() => setActiveTab("extra")}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === "extra"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            Extra Deck
          </button>
        </div>

        <div className="p-6">
          {activeTab === "main" && (
            <CardList cards={decklist.main_deck} title="Main Deck" />
          )}
          {activeTab === "extra" && (
            <CardList cards={decklist.extra_deck} title="Extra Deck" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DecklistDetail;
