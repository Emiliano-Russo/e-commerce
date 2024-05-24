// src/components/PayPalButton.js
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface Props {
  amountVal: string;
  onSuccess: (orderId: string) => void;
}

export const PayPalCheckoutButton = (props: Props) => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENTID;
  console.log("client id: ", clientId);
  const initialOptions = {
    clientId: clientId || "",
    currency: "USD",
  };

  const handleApprove = (orderID) => {
    // Aquí puedes manejar la lógica después de un pago exitoso
    props.onSuccess(orderID);
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE", // Assuming immediate payment capture (change if needed)
            purchase_units: [
              {
                amount: {
                  currency_code: "USD", // Assuming USD currency (replace if needed)
                  value: props.amountVal,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          if (actions && actions.order) {
            return actions.order.capture().then((details) => {
              handleApprove(data.orderID);
            });
          } else {
            // Retorna una promesa resuelta si actions.order no está definido
            return Promise.resolve();
          }
        }}
        onError={(err) => console.error(err)}
      />
    </PayPalScriptProvider>
  );
};
