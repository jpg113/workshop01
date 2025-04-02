import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { Button, Card, Row, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const { products, status, error } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.items);

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, token, navigate]);

  if (!token) return null;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price);
        return total + (isNaN(price) ? 0 : price); // Ensure valid price
      }, 0)
      .toFixed(2); // Ensure 2 decimal places
  };

  const formatPrice = (price) => {
    const parsedPrice = parseFloat(price);
    return isNaN(parsedPrice) ? '0.00' : parsedPrice.toFixed(2);
  };

  return (
    <div className="homepage-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <Button variant="secondary" onClick={() => setShowCart(true)}>
          Cart ({cartItems.length})
        </Button>
      </div>

      {status === 'loading' && (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {status === 'failed' && (
        <Alert variant="danger">
          Error: {error}
          <Button variant="outline-danger" size="sm" onClick={() => dispatch(fetchProducts())}>
            Retry
          </Button>
        </Alert>
      )}

      {status === 'succeeded' && products.length === 0 && <p>No products available</p>}

      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4}>
            <Card className="mb-3 shadow-sm">
              <Card.Img variant="top" src={`http://localhost:5000${product.imageUrl}`} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text className="price">Price: ${formatPrice(product.price)}</Card.Text>
                <Button variant="success" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Cart Modal */}
      <Modal show={showCart} onHide={() => setShowCart(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cart Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="d-flex justify-content-between align-items-center">
                  {item.name} - ${formatPrice(item.price)} {/* Format item price */}
                  <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(item.id)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <p>Total: ${calculateTotalPrice()}</p> {/* Display total price */}
          <Button variant="secondary" onClick={() => setShowCart(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Homepage;
