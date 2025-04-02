import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    }
});

// ✅ Export actions correctly
export const { addToCart, removeFromCart } = cartSlice.actions;

// ✅ Export the reducer
export default cartSlice.reducer;
