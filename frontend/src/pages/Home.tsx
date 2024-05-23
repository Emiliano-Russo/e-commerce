import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Spin } from "antd";

const { Meta } = Card;

export const Home = () => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Screen</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product: any) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
              <Card hoverable cover={<img alt={product.name} src={product.imageUrl} />}>
                <Meta title={product.name} description={`$${product.price}`} />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
