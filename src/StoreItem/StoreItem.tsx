import { useNavigate } from "react-router-dom";
import { storeItemType } from "../types/storeItem";
import "./StoreItem.css";

interface StoreItemProps {
  storeItem: storeItemType;
}

const StoreItem: React.FC<StoreItemProps> = ({ storeItem }): JSX.Element => {
  const {
    name,
    description,
    actualPrice,
    suggestedPrice,
    discountPercent,
    imageUrl,
  } = storeItem;

  const navigate = useNavigate();

  return (
    <div className="store-grid">
      <div className="store-sub-grid">
        <img className="store-img" src={imageUrl} alt={`image-${name}`} />
        <div className="store-details">
          <div>Item Name: <span>{name}</span></div>
          <div>Description: <span>{description}</span></div>
          <div>Actual Price: <span>{actualPrice}</span></div>
          <div>Discount Percent: <span>{`${discountPercent}%`}</span></div>
          <div>Suggested Price: <span>{suggestedPrice}</span></div>
          <button
            className="buy-button"
            onClick={() => navigate('/CheckoutForm', { state: { item: storeItem } })}
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  );
};
export default StoreItem;
