import { useState } from "react";
import "../styles/CardCheckbox.css";

const CardCheckbox = ({ cardType, isChecked, onChange }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  // Map card type to checkmarked frame image (shown when UNCHECKED)
  const getCardFrame = () => {
    switch (cardType) {
      case "Monster":
        return "/card-frames/monster-frame-checked.png";
      case "Spell":
        return "/card-frames/spell-frame-checked.png";
      case "Trap":
        return "/card-frames/trap-frame-checked.png";
      case "Fusion":
        return "/card-frames/fusion-frame-checked.png";
      case "Synchro":
        return "/card-frames/synchro-frame-checked.png";
      default:
        return "/card-frames/monster-frame-checked.png";
    }
  };

  const handleClick = () => {
    setIsFlipping(true);
    onChange();
    // Reset flip animation after it completes
    setTimeout(() => setIsFlipping(false), 480);
  };

  return (
    <div className="card-checkbox-container">
      <div
        className={`card-checkbox ${isChecked ? "flipped" : ""} ${isFlipping ? "flipping" : ""}`}
        onClick={handleClick}
      >
        {/* Front: Checkmarked frame (unchecked state) */}
        <div className="card-front">
          <img src={getCardFrame()} alt={`${cardType} frame`} />
        </div>
        {/* Back: Yu-Gi-Oh card back (checked state) */}
        <div className="card-back">
          <img src="/card-frames/card-back.png" alt="Card back" />
        </div>
      </div>
    </div>
  );
};

export default CardCheckbox;
