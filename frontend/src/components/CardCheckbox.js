import { useState } from "react";

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

      <style jsx>{`
        .card-checkbox-container {
          perspective: 1000px;
          width: 40px;
          height: 58px;
          cursor: pointer;
        }

        .card-checkbox {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .card-checkbox.flipped {
          transform: rotateY(180deg);
        }

        .card-checkbox:hover {
          filter: brightness(1.1);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 4px;
          overflow: hidden;
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .card-front img,
        .card-back img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  );
};

export default CardCheckbox;
