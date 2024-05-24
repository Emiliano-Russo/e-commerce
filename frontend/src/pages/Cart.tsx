// src/components/Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Card, Button, Row, Col, Typography, message } from "antd";
import { RootState } from "../redux/store";
import { clearCart, removeItemFromCart } from "../redux/cartSlice";
import { PayPalCheckoutButton } from "../components/PayPalButton";

const { Title } = Typography;

export const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePaymentSuccess = (orderID: string) => {
    console.log("Payment successful!", orderID);
    // Aquí puedes manejar la lógica después de un pago exitoso
    dispatch(clearCart());
    message.success("Pago Exitoso!");
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Shopping Cart</Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={item.name}
                    extra={
                      <Button type="primary" onClick={() => handleRemoveItem(item._id)}>
                        Remove
                      </Button>
                    }
                  >
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
      {cartItems.length > 0 && (
        <>
          <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
            <Col span={12}>
              <Button type="default" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Title level={4}>Total: ${calculateTotal()}</Title>
              <PayPalCheckoutButton amountVal={calculateTotal()} onSuccess={handlePaymentSuccess} />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};
