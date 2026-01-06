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
  
  // Card Collection Helper state
  const [currentPhase, setCurrentPhase] = useState('Monster'); // Monster, Spell, Trap
  const [currentLetter, setCurrentLetter] = useState('A');
  const [collectionData, setCollectionData] = useState(null);

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

  const resetBoth = () => {
    setPlayerA(null);
    setPlayerB(null);
    setPlayerALocked(false);
    setPlayerBLocked(false);
    setCollectionData(null);
    setCurrentPhase('Monster');
    setCurrentLetter('A');
  };
  
  // Generate collection data when both players are locked
  useEffect(() => {
    if (playerALocked && playerBLocked && playerA && playerB) {
      generateCollectionData();
    } else {
      setCollectionData(null);
      setCurrentPhase('Monster');
      setCurrentLetter('A');
    }
  }, [playerALocked, playerBLocked, playerA, playerB]);
  
  const generateCollectionData = () => {
    // Organize all cards by type and letter
    const organizeCards = (deck) => {
      const organized = {
        Monster: {},
        Spell: {},
        Trap: {}
      };
      
      [...(deck.main_deck || []), ...(deck.extra_deck || [])].forEach(card => {
        const type = card.card_type;
        // Only include Monster, Spell, Trap
        if (!['Monster', 'Spell', 'Trap'].includes(type)) return;
        
        const firstLetter = card.name.charAt(0).toUpperCase();
        
        if (!organized[type][firstLetter]) {
          organized[type][firstLetter] = [];
        }
        organized[type][firstLetter].push({
          name: card.name,
          quantity: card.quantity
        });
      });
      
      return organized;
    };
    
    const playerACards = organizeCards(playerA);
    const playerBCards = organizeCards(playerB);
    
    setCollectionData({
      playerA: playerACards,
      playerB: playerBCards
    });
  };
  
  const getAllLettersForPhase = (phase) => {
    if (!collectionData) return [];
    
    const lettersSet = new Set();
    
    // Get all letters from both players for this phase
    Object.keys(collectionData.playerA[phase] || {}).forEach(letter => lettersSet.add(letter));
    Object.keys(collectionData.playerB[phase] || {}).forEach(letter => lettersSet.add(letter));
    
    return Array.from(lettersSet).sort();
  };
  
  const getProgressPercentage = () => {
    if (!collectionData) return 0;
    
    const phases = ['Monster', 'Spell', 'Trap'];
    let totalLetters = 0;
    let completedLetters = 0;
    
    phases.forEach(phase => {
      const letters = getAllLettersForPhase(phase);
      totalLetters += letters.length;
      
      const phaseIndex = phases.indexOf(phase);
      const currentPhaseIndex = phases.indexOf(currentPhase);
      
      if (phaseIndex < currentPhaseIndex) {
        // All letters in previous phases are completed
        completedLetters += letters.length;
      } else if (phaseIndex === currentPhaseIndex) {
        // Count completed letters in current phase
        const currentLetterIndex = letters.indexOf(currentLetter);
        completedLetters += currentLetterIndex;
      }
    });
    
    return totalLetters > 0 ? Math.round((completedLetters / totalLetters) * 100) : 0;
  };
  
  const navigateNext = () => {
    const phases = ['Monster', 'Spell', 'Trap'];
    const currentLetters = getAllLettersForPhase(currentPhase);
    const currentIndex = currentLetters.indexOf(currentLetter);
    
    if (currentIndex < currentLetters.length - 1) {
      // Move to next letter in current phase
      setCurrentLetter(currentLetters[currentIndex + 1]);
    } else {
      // Move to next phase
      const phaseIndex = phases.indexOf(currentPhase);
      if (phaseIndex < phases.length - 1) {
        const nextPhase = phases[phaseIndex + 1];
        const nextPhaseLetters = getAllLettersForPhase(nextPhase);
        if (nextPhaseLetters.length > 0) {
          setCurrentPhase(nextPhase);
          setCurrentLetter(nextPhaseLetters[0]);
        }
      }
    }
  };
  
  const navigatePrevious = () => {
    const phases = ['Monster', 'Spell', 'Trap'];
    const currentLetters = getAllLettersForPhase(currentPhase);
    const currentIndex = currentLetters.indexOf(currentLetter);
    
    if (currentIndex > 0) {
      // Move to previous letter in current phase
      setCurrentLetter(currentLetters[currentIndex - 1]);
    } else {
      // Move to previous phase
      const phaseIndex = phases.indexOf(currentPhase);
      if (phaseIndex > 0) {
        const prevPhase = phases[phaseIndex - 1];
        const prevPhaseLetters = getAllLettersForPhase(prevPhase);
        if (prevPhaseLetters.length > 0) {
          setCurrentPhase(prevPhase);
          setCurrentLetter(prevPhaseLetters[prevPhaseLetters.length - 1]);
        }
      }
    }
  };
  
  const canNavigateNext = () => {
    if (!collectionData) return false;
    const phases = ['Monster', 'Spell', 'Trap'];
    const currentLetters = getAllLettersForPhase(currentPhase);
    const currentIndex = currentLetters.indexOf(currentLetter);
    const phaseIndex = phases.indexOf(currentPhase);
    
    // Can navigate if not at last letter of last phase
    return !(phaseIndex === phases.length - 1 && currentIndex === currentLetters.length - 1);
  };
  
  const canNavigatePrevious = () => {
    if (!collectionData) return false;
    const phases = ['Monster', 'Spell', 'Trap'];
    const currentLetters = getAllLettersForPhase(currentPhase);
    const currentIndex = currentLetters.indexOf(currentLetter);
    const phaseIndex = phases.indexOf(currentPhase);
    
    // Can navigate if not at first letter of first phase
    return !(phaseIndex === 0 && currentIndex === 0);
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
    <div className="bg-gray-800/60 rounded-lg border border-purple-500/20 p-6">
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
    <div className="bg-gray-800/60 rounded-lg border border-purple-500/20 p-5 hover:border-purple-500/50 transition-colors duration-200">
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
      <div className="bg-gray-800/60 rounded-lg border border-purple-500/20 p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{playerLabel}</h3>
        <h4 className="text-2xl font-bold text-purple-400 mb-1">{player.deck_name}</h4>
        <p className="text-gray-300 text-sm mb-4">{player.player_name}</p>

        {/* Main Deck */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold text-amber-400 mb-3 border-b border-amber-400/30 pb-2">
            Main Deck ({calculateTotalCards(player.main_deck)} cards)
          </h5>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(mainDeckGrouped).map(([type, cards]) =>
              cards.length > 0 ? (
                <div key={type}>
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
        </div>

        {/* Extra Deck */}
        {player.extra_deck && player.extra_deck.length > 0 && (
          <div>
            <h5 className="text-lg font-semibold text-cyan-400 mb-3 border-b border-cyan-400/30 pb-2">
              Extra Deck ({calculateTotalCards(player.extra_deck)} cards)
            </h5>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(extraDeckGrouped).map(([type, cards]) =>
                cards.length > 0 ? (
                  <div key={type}>
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
          </div>
        )}
      </div>
    );
  };

  const CardCollectionHelper = () => {
    if (!collectionData || !playerALocked || !playerBLocked) return null;
    
    const playerACards = collectionData.playerA[currentPhase]?.[currentLetter] || [];
    const playerBCards = collectionData.playerB[currentPhase]?.[currentLetter] || [];
    const progress = getProgressPercentage();
    const currentLetters = getAllLettersForPhase(currentPhase);
    const currentLetterIndex = currentLetters.indexOf(currentLetter) + 1;
    const totalLettersInPhase = currentLetters.length;
    
    return (
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl border-2 border-purple-500/30 p-6 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            📦 Card Collection Helper
          </h2>
          <p className="text-gray-400 text-sm">
            Gather cards alphabetically for both decks at once
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-400">
              {currentPhase}s - Letter {currentLetter} ({currentLetterIndex}/{totalLettersInPhase})
            </span>
            <span className="text-sm font-bold text-green-400">
              {progress}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Current Letter Display */}
        <div className="bg-gray-900/60 rounded-lg border border-purple-500/20 p-4 mb-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50 mb-3">
              <span className="text-5xl font-bold text-white">{currentLetter}</span>
            </div>
            <p className="text-gray-400 text-sm">
              Collecting {currentPhase} cards starting with "{currentLetter}"
            </p>
          </div>
        </div>
        
        {/* Navigation Buttons - Fixed Position Above Cards */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={navigatePrevious}
            disabled={!canNavigatePrevious()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              canNavigatePrevious()
                ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg"
                : "bg-gray-800 text-gray-600 cursor-not-allowed"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button
            onClick={navigateNext}
            disabled={!canNavigateNext()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              canNavigateNext()
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30"
                : "bg-gray-800 text-gray-600 cursor-not-allowed"
            }`}
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Cards Grid - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Player A Column */}
          <div className="bg-gray-800/60 rounded-lg border border-purple-500/30 p-4">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-purple-500/20">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <h3 className="text-lg font-bold text-purple-400">Player A</h3>
            </div>
            
            {playerACards.length > 0 ? (
              <ul className="space-y-2">
                {playerACards.map((card, idx) => (
                  <li key={idx} className="flex items-center justify-between text-gray-200 bg-gray-900/40 rounded px-3 py-2">
                    <span className="font-medium">{card.name}</span>
                    <span className="text-purple-400 font-bold text-sm bg-purple-500/20 px-2 py-1 rounded">
                      {card.quantity}x
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">
                  No cards needed for letter "{currentLetter}"
                </p>
              </div>
            )}
          </div>
          
          {/* Player B Column */}
          <div className="bg-gray-800/60 rounded-lg border border-pink-500/30 p-4">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-pink-500/20">
              <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              <h3 className="text-lg font-bold text-pink-400">Player B</h3>
            </div>
            
            {playerBCards.length > 0 ? (
              <ul className="space-y-2">
                {playerBCards.map((card, idx) => (
                  <li key={idx} className="flex items-center justify-between text-gray-200 bg-gray-900/40 rounded px-3 py-2">
                    <span className="font-medium">{card.name}</span>
                    <span className="text-pink-400 font-bold text-sm bg-pink-500/20 px-2 py-1 rounded">
                      {card.quantity}x
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">
                  No cards needed for letter "{currentLetter}"
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Completion Message */}
        {progress === 100 && (
          <div className="mt-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-4 text-center">
            <p className="text-green-400 font-semibold text-lg">
              🎉 All cards collected! Both decks are ready to build!
            </p>
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
              <h2 className="text-3xl font-bold text-purple-400 mb-2">{modalDecklist.deck_name}</h2>
              <p className="text-lg text-gray-300">{modalDecklist.player_name}</p>
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
      <div className="bg-gray-800/60 rounded-lg border border-purple-500/20 p-6">
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

          {/* Randomize Both & Reset Buttons */}
          <div className="flex items-center justify-center gap-4">
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
            <button
              onClick={resetBoth}
              disabled={!playerA && !playerB}
              className={`px-8 py-3 rounded-lg text-lg font-semibold transition-all ${
                !playerA && !playerB
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20"
              }`}
            >
              🔄 Reset Both
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
          <div className={`grid gap-6 ${
            playerALocked && playerBLocked 
              ? 'grid-cols-1 xl:grid-cols-2' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {playerALocked && playerA && (
              <FullDecklistView player={playerA} playerLabel="Player A" />
            )}
            {playerBLocked && playerB && (
              <FullDecklistView player={playerB} playerLabel="Player B" />
            )}
          </div>
        </div>
      )}
      
      {/* Card Collection Helper (when both are locked) */}
      {playerALocked && playerBLocked && <CardCollectionHelper />}

      {/* Decklist Preview Modal */}
      <DecklistModal />
    </div>
  );
};

export default HeadToHeadBuilder;
