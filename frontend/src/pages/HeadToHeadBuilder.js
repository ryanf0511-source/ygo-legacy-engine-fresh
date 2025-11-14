import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HeadToHeadBuilder = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [decklists, setDecklists] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Player selections
  const [playerA, setPlayerA] = useState(null);
  const [playerB, setPlayerB] = useState(null);
  const [playerALocked, setPlayerALocked] = useState(false);
  const [playerBLocked, setPlayerBLocked] = useState(false);
  
  // Modal state
  const [modalDecklist, setModalDecklist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch decklists when event is selected
  useEffect(() => {
    if (selectedEvent) {
      fetchDecklistsByEvent();
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/events`);
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchDecklistsByEvent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/decklists-by-event/${selectedEvent}`);
      setDecklists(response.data.decklists);
      // Reset selections when changing events
      setPlayerA(null);
      setPlayerB(null);
      setPlayerALocked(false);
      setPlayerBLocked(false);
    } catch (error) {
      console.error("Error fetching decklists:", error);
      setDecklists([]);
    } finally {
      setLoading(false);
    }
  };

  const assignToPlayerA = (decklist) => {
    if (!playerALocked) {
      setPlayerA(decklist);
    }
  };

  const assignToPlayerB = (decklist) => {
    if (!playerBLocked) {
      setPlayerB(decklist);
    }
  };

  const randomizePlayerA = () => {
    if (!playerALocked && decklists.length > 0) {
      const randomIndex = Math.floor(Math.random() * decklists.length);
      setPlayerA(decklists[randomIndex]);
    }
  };

  const randomizePlayerB = () => {
    if (!playerBLocked && decklists.length > 0) {
      const randomIndex = Math.floor(Math.random() * decklists.length);
      setPlayerB(decklists[randomIndex]);
    }
  };

  const randomizeBoth = () => {
    if (decklists.length >= 2 && !playerALocked && !playerBLocked) {
      const shuffled = [...decklists].sort(() => Math.random() - 0.5);
      setPlayerA(shuffled[0]);
      setPlayerB(shuffled[1]);
    }
  };

  const calculateTotalCards = (cards) => {
    return cards?.reduce((sum, card) => sum + (card.quantity || 0), 0) || 0;
  };

  const groupCardsByType = (cards) => {
    const grouped = {
      Monster: [],
      Spell: [],
      Trap: [],
      Fusion: [],
      Synchro: [],
      Other: []
    };

    cards?.forEach((card) => {
      const type = card.card_type || "Other";
      if (grouped[type]) {
        grouped[type].push(card);
      } else {
        grouped.Other.push(card);
      }
    });

    return grouped;
  };

  const DeckSlot = ({ player, playerLabel, onRandomize, isLocked, onLockToggle }) => (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{playerLabel}</h3>
        <div className="flex space-x-2">
          <button
            onClick={onRandomize}
            disabled={isLocked}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLocked
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            }`}
          >
            🎲 Randomize
          </button>
          <button
            onClick={onLockToggle}
            disabled={!player}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              !player
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : isLocked
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isLocked ? "🔒 Locked" : "🔓 Lock In"}
          </button>
        </div>
      </div>

      {player ? (
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-purple-400">{player.deck_name}</h4>
          <p className="text-gray-300 text-sm">{player.player_name}</p>
          <p className="text-sm text-gray-400">{player.event}</p>
          <div className="flex space-x-4 text-sm mt-2">
            <span className="text-gray-400">
              Main: <span className="font-semibold text-purple-400">{calculateTotalCards(player.main_deck)}</span>
            </span>
            <span className="text-gray-400">
              Extra: <span className="font-semibold text-blue-400">{calculateTotalCards(player.extra_deck)}</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No deck selected</p>
          <p className="text-sm mt-2">Browse below or use Randomize</p>
        </div>
      )}
    </div>
  );

  const openModal = (decklist) => {
    setModalDecklist(decklist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalDecklist(null);
  };

  const DecklistCard = ({ decklist }) => (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-5 hover:border-purple-500/50 transition-all duration-300">
      <div 
        className="mb-4 cursor-pointer"
        onClick={() => openModal(decklist)}
      >
        <h3 className="text-xl font-bold text-purple-400 hover:text-purple-300 transition-colors">{decklist.deck_name}</h3>
        <p className="text-gray-300 text-sm mt-1">{decklist.player_name}</p>
        <div className="flex items-center space-x-4 text-sm mt-2 text-gray-400">
          <span>Main: <span className="font-semibold text-purple-400">{calculateTotalCards(decklist.main_deck)}</span></span>
          <span>Extra: <span className="font-semibold text-blue-400">{calculateTotalCards(decklist.extra_deck)}</span></span>
        </div>
        <p className="text-xs text-gray-500 mt-2">👁️ Click to preview decklist</p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => assignToPlayerA(decklist)}
          disabled={playerALocked}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            playerALocked
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
          }`}
        >
          Assign to Player A
        </button>
        <button
          onClick={() => assignToPlayerB(decklist)}
          disabled={playerBLocked}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            playerBLocked
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-600 to-pink-700 text-white hover:from-pink-700 hover:to-pink-800"
          }`}
        >
          Assign to Player B
        </button>
      </div>
    </div>
  );

  const FullDecklistView = ({ player, playerLabel }) => {
    const mainDeckGrouped = groupCardsByType(player.main_deck);
    const extraDeckGrouped = groupCardsByType(player.extra_deck);

    return (
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{playerLabel}</h3>
        <h4 className="text-xl font-semibold text-purple-400 mb-1">{player.player_name}</h4>
        <p className="text-gray-300 mb-4">{player.deck_name}</p>

        {/* Main Deck */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold text-amber-400 mb-3 border-b border-amber-400/30 pb-2">
            Main Deck ({calculateTotalCards(player.main_deck)} cards)
          </h5>
          {Object.entries(mainDeckGrouped).map(([type, cards]) =>
            cards.length > 0 ? (
              <div key={type} className="mb-4">
                <h6 className="text-sm font-semibold text-gray-400 mb-2">{type}s:</h6>
                <ul className="space-y-1">
                  {cards.map((card, idx) => (
                    <li key={idx} className="text-gray-300 text-sm">
                      {card.quantity}x {card.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
        </div>

        {/* Extra Deck */}
        {player.extra_deck && player.extra_deck.length > 0 && (
          <div>
            <h5 className="text-lg font-semibold text-cyan-400 mb-3 border-b border-cyan-400/30 pb-2">
              Extra Deck ({calculateTotalCards(player.extra_deck)} cards)
            </h5>
            {Object.entries(extraDeckGrouped).map(([type, cards]) =>
              cards.length > 0 ? (
                <div key={type} className="mb-4">
                  <h6 className="text-sm font-semibold text-gray-400 mb-2">{type}s:</h6>
                  <ul className="space-y-1">
                    {cards.map((card, idx) => (
                      <li key={idx} className="text-gray-300 text-sm">
                        {card.quantity}x {card.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    );
  };

  const DecklistModal = () => {
    if (!isModalOpen || !modalDecklist) return null;

    const mainDeckGrouped = groupCardsByType(modalDecklist.main_deck);
    const extraDeckGrouped = groupCardsByType(modalDecklist.extra_deck);

    return (
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={closeModal}
      >
        <div 
          className="bg-gray-900 rounded-xl border border-purple-500/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-purple-500/30 p-6 flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{modalDecklist.player_name}</h2>
              <p className="text-xl text-purple-400 font-semibold">{modalDecklist.deck_name}</p>
              <p className="text-sm text-gray-400 mt-1">{modalDecklist.event}</p>
              <div className="flex items-center space-x-4 text-sm mt-3">
                <span className="text-gray-400">Main: <span className="font-semibold text-purple-400">{calculateTotalCards(modalDecklist.main_deck)}</span></span>
                <span className="text-gray-400">Extra: <span className="font-semibold text-blue-400">{calculateTotalCards(modalDecklist.extra_deck)}</span></span>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-white transition-colors ml-4"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {/* Main Deck */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-amber-400 mb-4 border-b border-amber-400/30 pb-2">
                Main Deck ({calculateTotalCards(modalDecklist.main_deck)} cards)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(mainDeckGrouped).map(([type, cards]) =>
                  cards.length > 0 ? (
                    <div key={type}>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">{type}s:</h4>
                      <ul className="space-y-1">
                        {cards.map((card, idx) => (
                          <li key={idx} className="text-gray-300 text-sm">
                            {card.quantity}x {card.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {/* Extra Deck */}
            {modalDecklist.extra_deck && modalDecklist.extra_deck.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4 border-b border-cyan-400/30 pb-2">
                  Extra Deck ({calculateTotalCards(modalDecklist.extra_deck)} cards)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(extraDeckGrouped).map(([type, cards]) =>
                    cards.length > 0 ? (
                      <div key={type}>
                        <h4 className="text-sm font-semibold text-gray-400 mb-3">{type}s:</h4>
                        <ul className="space-y-1">
                          {cards.map((card, idx) => (
                            <li key={idx} className="text-gray-300 text-sm">
                              {card.quantity}x {card.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4 border-t border-purple-500/20">
              <button
                onClick={() => {
                  assignToPlayerA(modalDecklist);
                  closeModal();
                }}
                disabled={playerALocked}
                className={`flex-1 py-3 rounded-lg text-base font-semibold transition-all ${
                  playerALocked
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
                }`}
              >
                Assign to Player A
              </button>
              <button
                onClick={() => {
                  assignToPlayerB(modalDecklist);
                  closeModal();
                }}
                disabled={playerBLocked}
                className={`flex-1 py-3 rounded-lg text-base font-semibold transition-all ${
                  playerBLocked
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-600 to-pink-700 text-white hover:from-pink-700 hover:to-pink-800"
                }`}
              >
                Assign to Player B
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          Head-to-Head <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Builder</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Select an SJC event and choose two decklists to build and battle! Browse through all available decks from the tournament,
          assign them to Player A and Player B, or use the randomize buttons for a surprise matchup. Lock in your selections to view the full decklists.
        </p>
      </div>

      {/* Event Filter */}
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select SJC Event
        </label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
        >
          <option value="">Choose an event...</option>
          {events.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>

      {/* Player Slots */}
      {selectedEvent && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DeckSlot
              player={playerA}
              playerLabel="Player A"
              onRandomize={randomizePlayerA}
              isLocked={playerALocked}
              onLockToggle={() => setPlayerALocked(!playerALocked)}
            />
            <DeckSlot
              player={playerB}
              playerLabel="Player B"
              onRandomize={randomizePlayerB}
              isLocked={playerBLocked}
              onLockToggle={() => setPlayerBLocked(!playerBLocked)}
            />
          </div>

          {/* Randomize Both Button */}
          <div className="text-center">
            <button
              onClick={randomizeBoth}
              disabled={playerALocked || playerBLocked}
              className={`px-8 py-3 rounded-lg text-lg font-semibold transition-all ${
                playerALocked || playerBLocked
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 shadow-lg shadow-purple-500/20"
              }`}
            >
              🎲 Randomize Both Players
            </button>
          </div>
        </>
      )}

      {/* Browse Decklists */}
      {selectedEvent && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Browse Decklists ({decklists.length} available)
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              <p className="text-gray-400 mt-4">Loading decklists...</p>
            </div>
          ) : decklists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {decklists.map((decklist) => (
                <DecklistCard key={decklist.id} decklist={decklist} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No decklists found for this event.</p>
            </div>
          )}
        </div>
      )}

      {/* Full Decklist Display (after lock-in) */}
      {(playerALocked || playerBLocked) && (
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Locked Decklists
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {playerALocked && playerA && (
              <FullDecklistView player={playerA} playerLabel="Player A" />
            )}
            {playerBLocked && playerB && (
              <FullDecklistView player={playerB} playerLabel="Player B" />
            )}
          </div>
        </div>
      )}

      {/* Decklist Preview Modal */}
      <DecklistModal />
    </div>
  );
};

export default HeadToHeadBuilder;
