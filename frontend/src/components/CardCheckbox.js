import { useState } from "react";
import "../styles/CardCheckbox.css";

const CardCheckbox = ({ cardType, isChecked, onChange }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("forward");

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
    // Set flip direction based on current state
    // Checking (unchecked → checked): rotateY forward
    // Unchecking (checked → unchecked): rotateX backward
    setFlipDirection(isChecked ? "backward" : "forward");
    onChange();
    // Reset flip animation after it completes
    setTimeout(() => setIsFlipping(false), 400);
  };

  return (
    <div className="card-checkbox-container">
      <div
        className={`card-checkbox ${isChecked ? "flipped" : ""} ${isFlipping ? "flipping" : ""} ${flipDirection === "backward" ? "flip-backward" : ""}`}
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
