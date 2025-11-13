import { useState } from "react";
import "../styles/CardCheckbox.css";

const CardCheckbox = ({ cardType, isChecked, onChange }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  // Map card type to frame image (blank or with checkmark)
  const getCardFrame = () => {
    // If not checked, show blank frame
    // If checked and not currently flipping, show frame with checkmark
    const useChecked = isChecked && !isFlipping;
    
    switch (cardType) {
      case "Monster":
        return useChecked ? "/card-frames/monster-frame-checked.png" : "/card-frames/monster-frame.png";
      case "Spell":
        return useChecked ? "/card-frames/spell-frame-checked.png" : "/card-frames/spell-frame.png";
      case "Trap":
        return useChecked ? "/card-frames/trap-frame-checked.png" : "/card-frames/trap-frame.png";
      case "Fusion":
        return useChecked ? "/card-frames/fusion-frame-checked.png" : "/card-frames/fusion-frame.png";
      case "Synchro":
        return useChecked ? "/card-frames/synchro-frame-checked.png" : "/card-frames/synchro-frame.png";
      default:
        return useChecked ? "/card-frames/monster-frame-checked.png" : "/card-frames/monster-frame.png";
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
        className="card-checkbox"
        onClick={handleClick}
      >
        <div className="card-front">
          <img src={getCardFrame()} alt={`${cardType} frame`} />
        </div>
      </div>
    </div>
  );
};

export default CardCheckbox;
