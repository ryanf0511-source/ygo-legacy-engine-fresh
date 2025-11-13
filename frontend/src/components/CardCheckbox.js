import "../styles/CardCheckbox.css";

const CardCheckbox = ({ cardType, isChecked, onChange }) => {
  // Map card type to checkmarked frame image
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

  return (
    <div className="card-checkbox-container">
      <div
        className="card-checkbox"
        onClick={onChange}
      >
        <div className="card-front">
          <img src={getCardFrame()} alt={`${cardType} frame`} />
        </div>
      </div>
    </div>
  );
};

export default CardCheckbox;
