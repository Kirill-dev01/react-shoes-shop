import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Описываем, как выглядит товар в корзине
export interface CartItem {
    id: number;
    title: string;
    price: number;
    count: number;
    size: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const newItem = action.payload;
            // Ищем, есть ли уже такой товар
            const existingItem = state.items.find(
                item => item.id === newItem.id && item.size === newItem.size
            );

            if (existingItem) {
                // Если есть - просто плюсуем количество
                existingItem.count += newItem.count;
            } else {
                // Если нет - добавляем новый
                state.items.push(newItem);
            }
        },
        removeFromCart(state, action: PayloadAction<{ id: number; size: string }>) {
            // Удаляем товар по совпадению ID и размера
            state.items = state.items.filter(
                item => !(item.id === action.payload.id && item.size === action.payload.size)
            );
        },
        clearCart(state) {
            state.items = [];
        }
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;