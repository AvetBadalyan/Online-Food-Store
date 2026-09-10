import { get, push, ref } from 'firebase/database'
import { MEALS_MAP } from '../data/meals'
import { db } from './firebase'

// Meals are static local data — no DB needed, no network latency, no stale data.
// Firebase is used only for orders and auth.

export async function fetchMealById(id) {
	return MEALS_MAP[id] ?? null
}

// POST an order to Firebase Realtime DB
export async function postOrder(orderData) {
	const ordersRef = ref(db, 'orders')
	await push(ordersRef, {
		...orderData,
		createdAt: new Date().toISOString()
	})
}

// Fetch orders for a specific user uid
export async function fetchOrdersByUser(uid) {
	try {
		const snapshot = await get(ref(db, 'orders'))
		if (!snapshot.exists()) return []
		const data = snapshot.val()
		return Object.entries(data)
			.map(([id, order]) => ({ id, ...order }))
			.filter(order => order.uid === uid)
			.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
	} catch {
		return []
	}
}
