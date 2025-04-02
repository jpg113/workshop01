import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/authSlice';
import { Button, Form } from 'react-bootstrap';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userData = { username, password };
      const response = await dispatch(loginUser(userData));

      if (response.payload && response.payload.token) {
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred, please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="form-card">
        <h2 className="form-title">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="username" className="form-group">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Button variant="primary" type="submit" className="mt-3">
            Login
          </Button>
        </Form>

        <p className="mt-3">
          Don't have an account? 
          <Button variant="link" className="variant-link" onClick={() => navigate('/register')}>Register here</Button>
        </p>
      </div>
    </div>
  );
};

export default Login;
