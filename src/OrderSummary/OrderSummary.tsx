import { useLocation } from "react-router-dom";
import { generatePrice } from "../Utils";

const OrderSummary = () => {
  const location = useLocation();
  const { description, suggestedPrice } = location.state;

  return (
    <div className="App">
      <div className="App-content">
        <h2>Order Confirmation</h2>
        <h4>Your order is placed and confirmed successfully!</h4>
        <h4>
          {` Your Order number is ${generatePrice(1000, 10000)} for the order
        description - `}<em>{description}</em>
        </h4>
        <h5>{`Amount charged to the Credit card is ${suggestedPrice}`}</h5>
      </div>
    </div>
  );
};
export default OrderSummary;
