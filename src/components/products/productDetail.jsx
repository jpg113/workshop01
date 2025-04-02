import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { products, loading, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const product = products.find(p => p.id === parseInt(id));

    if (!product) return <div>Product not found</div>;

    return (
        <div className="container mt-5">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Status:</strong> {product.active ? 'Active' : 'Inactive'}</p>
            {/* Add any additional product details here */}
        </div>
    );
};

export default ProductDetails;
