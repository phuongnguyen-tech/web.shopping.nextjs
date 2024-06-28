// redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { CartState } from './cartSlice' // Assuming CartState is exported from cartSlice
import Cookies from 'js-cookie' // Import 'js-cookie' as 'Cookies'

// Retrieve persisted cart state from cookie
const persistedCartState = Cookies.get('cart')
    ? (JSON.parse(Cookies.get('cart')!) as CartState)
    : undefined

// Configure Redux store
const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: persistedCartState ? { cart: persistedCartState } : undefined,
})

// Subscribe to store changes to update cookie
store.subscribe(() => {
    const state = store.getState()
    Cookies.set('cart', JSON.stringify(state.cart)) // Store the 'cart' slice of the state in the cookie
})

export type RootState = ReturnType<typeof store.getState>
export default store
