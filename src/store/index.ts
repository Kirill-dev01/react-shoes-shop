import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import cartReducer from './cartSlice';

// 1. Пытаемся достать сохраненную корзину из памяти браузера
const savedCart = localStorage.getItem('cartItems');
const preloadedState = {
    cart: {
        items: savedCart ? JSON.parse(savedCart) : [],
    }
};

export const store = configureStore({
    reducer: {
        search: searchReducer,
        cart: cartReducer,
    },
    preloadedState, // 2. Загружаем сохраненные данные при старте
});

// 3. Подписываемся на любые изменения в Redux. 
// Как только кто-то добавил или удалил товар — сохраняем новый список в localStorage
store.subscribe(() => {
    localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;