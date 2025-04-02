import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import ProductList from './components/products/productlist';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Homepage from './components/homepage/homepage';

const App = () => {
    return (
        <Provider store={store}>
            <Router basename="/workshop01"> {/* GitHub Pages Fix */}
                <Routes>
                    <Route path="/" element={<AuthRedirect />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                    <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
                </Routes>
            </Router>
        </Provider>
    );
};

// Redirect users based on authentication state
const AuthRedirect = () => {
    const token = useSelector((state) => state.auth.token);
    return token ? <Navigate to="/homepage" replace /> : <Navigate to="/login" replace />;
};

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    return token ? children : <Navigate to="/login" replace />;
};

export default App;
