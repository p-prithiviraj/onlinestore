import { storeItemType } from "../types/storeItem";
import storeItemImage from "../images/storeItemImage.jpg";
import { billingInput } from "../types/billingInfo";

export const generatePrice = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getStoreItemList = (): storeItemType[] => {
  const storeItem = (index: number) => {
    const actualPrice = generatePrice(100, 10000);
    const discountPercent = generatePrice(10, 50);
    const suggestedPrice = actualPrice - (actualPrice * discountPercent) / 100;
    return {
      id: index + 1,
      name: `Store Item ${index + 1}`,
      description: `Item short Description ${index + 1}`,
      suggestedPrice: Math.round(suggestedPrice),
      actualPrice: actualPrice,
      discountPercent: discountPercent,
      imageUrl: storeItemImage,
    };
  };

  return Array.from({ length: 20 }, (_, index) => storeItem(index));
};

export const inputFields: billingInput[] = [
  {
    type: "text",
    id: "name",
    placeholder: "Enter Your Full Name",
    errorMessage: "Invalid Name",
  },
  {
    type: "textarea",
    id: "address",
    placeholder: "Enter Your Address",
    errorMessage: "Invalid Address",
  },
  {
    type: "text",
    id: "email",
    placeholder: "Enter Your Email",
    errorMessage: "Invalid Email",
  },
  {
    type: "text",
    id: "phone",
    placeholder: "Enter Your Phone",
    errorMessage: "Invalid Phone number",
  },
  {
    type: "text",
    id: "creditcard",
    placeholder: "Enter Your Credit card number",
    errorMessage: "Invalid Credit card number",
  },
];

export const formatPhoneNumber = (value:string)=>{
    const phonenumbers = value.split('');
    phonenumbers.splice(6,0,'-');
    phonenumbers.splice(3,0,'-');

    return phonenumbers.join('');
}