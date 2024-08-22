import { useLocation, useNavigate } from "react-router-dom";
import "./CheckoutForm.css";
import { useState } from "react";
import {
  billingInfoErrorType,
  billingInfoType,
  billingInput,
} from "../types/billingInfo";
import { formatPhoneNumber, inputFields } from "../Utils";

const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    name,
    description,
    actualPrice,
    discountPercent,
    suggestedPrice,
    imageUrl,
  } = location.state.item;

  const [formData, setFormData] = useState<billingInfoType>({
    name: "",
    address: "",
    email: "",
    phone: "",
    creditcard: "",
  });

  const [error, setError] = useState<billingInfoErrorType>({
    name: false,
    address: false,
    email: false,
    phone: false,
    creditcard: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const validName = new RegExp(/^[A-Za-z]+$/);
  const validPhone = new RegExp(/^(\d{10})$/);
  const validCreditCard = new RegExp(/^(\d{19})$/);

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "name":
        if (validName.test(event.target.value)) {
          setError({
            ...error,
            [event.target.id]: false,
          });
        } else {
          setError({
            ...error,
            [event.target.id]: true,
          });
        }

        break;
      case "address":
        if (event.target.value !== "") {
          setError({
            ...error,
            [event.target.id]: false,
          });
        } else {
          setError({
            ...error,
            [event.target.id]: true,
          });
        }

        break;
      case "email":
        if (
          event.target.value.includes("@") &&
          event.target.value.endsWith(".com")
        ) {
          setError({
            ...error,
            [event.target.id]: false,
          });
        } else {
          setError({
            ...error,
            [event.target.id]: true,
          });
        }

        break;
      case "phone":
        if (validPhone.test(event.target.value)) {
          setFormData({
            ...formData,
            [event.target.id]: formatPhoneNumber(event.target.value),
          });
          setError({
            ...error,
            [event.target.id]: false,
          });
        } else {
          setError({
            ...error,
            [event.target.id]: true,
          });
        }
        break;
      case "creditcard":
        if (validCreditCard.test(event.target.value)) {
          setError({
            ...error,
            [event.target.id]: false,
          });
        } else {
          setError({
            ...error,
            [event.target.id]: true,
          });
        }

        break;

      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (Object.values(formData).some((data) => data === "")) {
      setError({
        name: formData["name"] === "",
        address: formData["address"] === "",
        email: formData["email"] === "",
        phone: formData["phone"] === "",
        creditcard: formData["creditcard"] === "",
      });
    }
    if (
      Object.values(error).every((err) => !err) &&
      Object.values(formData).every((data) => data !== "")
    ) {
      navigate("/OrderSummary", {
        state: { description, suggestedPrice },
      });
    }
  };

  const renderInputField = (inputField: billingInput) => {
    return (
      <>
        <input
          type={inputField.type}
          id={inputField.id}
          value={formData[inputField.id]}
          placeholder={inputField.placeholder}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e)}
        />
        {error[inputField.id] && <span>{inputField.errorMessage}</span>}
      </>
    );
  };

  return (
    <div className="App">
      <div className="App-content">
        <div className="form-container">
          <div className="summary">
            <h2>Summary</h2>
            <div className="summary-grid">
              <img className="store-img" src={imageUrl} alt={`image-${name}`} />
              <div className="summary-detail">
                <div>
                  Item Name: <span>{name}</span>
                </div>
                <div>
                  Description: <span>{description}</span>
                </div>
                <div>
                  Actual Price: <span>{actualPrice}</span>
                </div>
                <div>
                  Discount Percent: <span>{discountPercent}</span>
                </div>
                <div>
                  Amount to be Paid: <span>{suggestedPrice}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="billing">
            <h2>Billing Information</h2>
            {inputFields.map((inputField: billingInput) =>
              renderInputField(inputField)
            )}
            <div>
              <button onClick={() => handleSubmit()}>SUBMIT ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutForm;
