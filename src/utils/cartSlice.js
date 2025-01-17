import { createSlice, current, nanoid } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = {...action.payload, cartItemId: nanoid()};
            state.items.push(newItem);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.cartItemId!==action.payload.cartItemId)
        },
        clearCart: (state) => {
            state.items.length = 0; 
        }
    }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions 
export default cartSlice.reducer; 