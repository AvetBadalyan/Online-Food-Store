import { createContext, useContext, useEffect, useReducer } from 'react'

const STORAGE_KEY = 'foodstore_cart'

function getInitialState() {
	try {
		const stored = localStorage.getItem(STORAGE_KEY)
		if (stored) return JSON.parse(stored)
	} catch {
		// ignore malformed storage
	}
	return { items: [], totalAmount: 0 }
}

function cartReducer(state, action) {
	switch (action.type) {
		case 'ADD': {
			const existingIndex = state.items.findIndex(item => item.id === action.item.id)
			const updatedItems =
				existingIndex >= 0
					? state.items.map((item, i) =>
							i === existingIndex ? { ...item, amount: item.amount + action.item.amount } : item
						)
					: [...state.items, action.item]

			return {
				items: updatedItems,
				totalAmount: +(state.totalAmount + action.item.price * action.item.amount).toFixed(2)
			}
		}

		case 'REMOVE': {
			const existingIndex = state.items.findIndex(item => item.id === action.id)
			if (existingIndex < 0) return state

			const existing = state.items[existingIndex]
			const updatedItems =
				existing.amount === 1
					? state.items.filter(item => item.id !== action.id)
					: state.items.map((item, i) =>
							i === existingIndex ? { ...item, amount: item.amount - 1 } : item
						)

			return {
				items: updatedItems,
				totalAmount: +(state.totalAmount - existing.price).toFixed(2)
			}
		}

		case 'CLEAR':
			return { items: [], totalAmount: 0 }

		default:
			return state
	}
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
	const [state, dispatch] = useReducer(cartReducer, undefined, getInitialState)

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
	}, [state])

	const addItem = item => dispatch({ type: 'ADD', item })
	const removeItem = id => dispatch({ type: 'REMOVE', id })
	const clearCart = () => dispatch({ type: 'CLEAR' })
	const totalItems = state.items.reduce((sum, item) => sum + item.amount, 0)

	return (
		<CartContext.Provider
			value={{
				items: state.items,
				totalAmount: state.totalAmount,
				totalItems,
				addItem,
				removeItem,
				clearCart
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const ctx = useContext(CartContext)
	if (!ctx) throw new Error('useCart must be used within CartProvider')
	return ctx
}
