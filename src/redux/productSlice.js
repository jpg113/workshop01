import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://ai-x553.onrender.com/products';

// Helper function to get the token from localStorage or any other storage method you're using
const getAuthToken = () => {
    return localStorage.getItem('authToken'); // Adjust this based on where you store the token
};

// Fetch all products with authorization token
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
    const token = getAuthToken();

    const response = await axios.get(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`, // Add token to request header
        }
    });
    return response.data;
});

// Add a new product with authorization token
export const addProduct = createAsyncThunk('products/add', async (productData) => {
    const token = getAuthToken();

    const response = await axios.post(API_URL, productData, {
        headers: {
            'Authorization': `Bearer ${token}`, // Add token to request header
        }
    });
    return response.data;
});

// Update a product with authorization token
export const updateProduct = createAsyncThunk('products/update', async ({ id, updatedProduct }) => {
    const token = getAuthToken();

    const response = await axios.put(`${API_URL}/${id}`, updatedProduct, {
        headers: {
            'Authorization': `Bearer ${token}`, // Add token to request header
        }
    });
    return response.data;
});

// Deactivate a product with authorization token
export const deactivateProduct = createAsyncThunk('products/deactivate', async (id) => {
    const token = getAuthToken();

    const response = await axios.patch(`${API_URL}/${id}/deactivate`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`, // Add token to request header
        }
    });
    return { id };
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(deactivateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index].active = false;
                }
            });
    },
});

export default productSlice.reducer;
