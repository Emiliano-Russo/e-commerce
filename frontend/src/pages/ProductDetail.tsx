import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Row, Col, Spin, Alert } from "antd";
import { Product } from "../dto/product.interface";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<null | Product>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItemToCart(product));
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (product == null) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h1>Product Not Found</h1>
      </div>
    );
  }

  return (
    <Row gutter={[16, 16]} style={{ padding: "20px" }}>
      <Col xs={24} md={12}>
        <Card
          cover={
            <img
              alt={product.name}
              style={{ maxWidth: "300px" }}
              src={product.imageUrl || "https://via.placeholder.com/400"}
            />
          }
          style={{ marginBottom: "20px" }}
        >
          <Card.Meta title={product.name} description={`Category: ${product.category}`} />
          <p>{product.description}</p>
          <p style={{ fontWeight: "bold", fontSize: "1.5em" }}>Price: ${product.price}</p>
          <Button type="primary" style={{ marginRight: "10px" }}>
            Buy Now
          </Button>
          <Button type="default" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Card>
      </Col>
    </Row>
  );
};
