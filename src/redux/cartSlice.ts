// redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import Cookies from 'js-cookie' // Import 'js-cookie' as 'Cookies'

export interface CartState {
    items: IProduct[]
    totalPrice: number
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const { id } = action.payload
            const existingItem = state.items.find((item) => item.id === id)
            if (existingItem) {
                existingItem.quantity++
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
            state.totalPrice = calculateTotalPrice(state.items)
            Cookies.set('cart', JSON.stringify(state)) // Convert state to JSON string
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
            state.totalPrice = calculateTotalPrice(state.items)
            Cookies.set('cart', JSON.stringify(state)) // Convert state to JSON string
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload
            const itemToUpdate = state.items.find((item) => item.id === id)
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity
            }
            state.totalPrice = calculateTotalPrice(state.items)
            Cookies.set('cart', JSON.stringify(state)) // Convert state to JSON string
        },
    },
})

const calculateTotalPrice = (items: IProduct[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.items
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice

export default cartSlice.reducer
