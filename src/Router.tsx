import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import OrderSummary from "./OrderSummary/OrderSummary";

const RouterConfig: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/CheckoutForm" element={<CheckoutForm />} />
        <Route path="/OrderSummary" element={<OrderSummary />} />
        <Route path="*" element={<>{"Page not exists"}</>} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;
