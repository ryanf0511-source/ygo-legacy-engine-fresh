import React from "react";
import "../styles/CardCheckbox.css";

const CardCheckbox = React.memo(({ cardType, cardSubtype, isChecked, onChange }) => {
  // Map card type to checkmarked frame image (shown when CHECKED)
  const getCardFrame = () => {
    // For monsters, check subtype first
    if (cardType === "Monster" && cardSubtype) {
      switch (cardSubtype) {
        case "Ritual":
          return "/card-frames/ritual-frame-checked.png";
        case "Normal":
          return "/card-frames/normal-frame-checked.png";
        default:
          return "/card-frames/monster-frame-checked.png";
      }
    }
    
    // For non-monsters or monsters without subtype
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

  return (
    <div className="card-checkbox-container" onClick={onChange} style={{ cursor: 'pointer', padding: '8px' }}>
      <div
        className={`card-checkbox ${isChecked ? "flipped" : ""}`}
      >
        {/* Front: Yu-Gi-Oh card back (unchecked state) */}
        <div className="card-front">
          <img src="/card-frames/card-back.png" alt="Card back" loading="lazy" />
        </div>
        {/* Back: Checkmarked frame (checked state) */}
        <div className="card-back">
          <img src={getCardFrame()} alt={`${cardType} frame checked`} loading="lazy" />
        </div>
      </div>
    </div>
  );
});

CardCheckbox.displayName = 'CardCheckbox';

export default CardCheckbox;
