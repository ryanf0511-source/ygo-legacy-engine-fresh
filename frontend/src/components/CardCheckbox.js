import { useState } from "react";
import "../styles/CardCheckbox.css";

const CardCheckbox = ({ cardType, isChecked, onChange }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  // Map card type to frame image
  const getCardFrame = () => {
    switch (cardType) {
      case "Monster":
        return "/card-frames/monster-frame.png";
      case "Spell":
        return "/card-frames/spell-frame.png";
      case "Trap":
        return "/card-frames/trap-frame.png";
      case "Fusion":
        return "/card-frames/fusion-frame.png";
      case "Synchro":
        return "/card-frames/synchro-frame.png";
      default:
        return "/card-frames/monster-frame.png";
    }
  };

  const handleClick = () => {
    setIsFlipping(true);
    onChange();
    // Reset flip animation after it completes
    setTimeout(() => setIsFlipping(false), 600);
  };

  return (
    <div className="card-checkbox-container">
      <div
        className={`card-checkbox ${isChecked ? "flipped" : ""} ${isFlipping ? "flipping" : ""}`}
        onClick={handleClick}
      >
        <div className="card-front">
          <img src={getCardFrame()} alt={`${cardType} frame`} />
          {/* Checkbox icon overlay in the card art area */}
          <div className="checkbox-indicator">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="3"
                stroke="white"
                strokeWidth="2"
                fill="rgba(0, 0, 0, 0.5)"
              />
              <path
                d="M7 12L10 15L17 8"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />
            </svg>
          </div>
        </div>
        <div className="card-back">
          <img src="/card-frames/card-back.png" alt="Card back" />
        </div>
      </div>
    </div>
  );
};

export default CardCheckbox;
