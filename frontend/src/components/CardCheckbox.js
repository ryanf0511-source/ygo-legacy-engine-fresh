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
        </div>
        <div className="card-back">
          <img src="/card-frames/card-back.png" alt="Card back" />
        </div>
      </div>
    </div>
  );
};

export default CardCheckbox;
