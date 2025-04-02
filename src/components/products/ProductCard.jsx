import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="card mb-4">
            <img src={product.imageUrl} alt={product.name} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <a href={`/product/${product.id}`} className="btn btn-primary">View Details</a>
            </div>
        </div>
    );
};

export default ProductCard;
