import { equalTo, get, orderByChild, push, query, ref } from 'firebase/database'
import { db } from './firebase'

export async function postOrder(orderData) {
	await push(ref(db, 'orders'), {
		...orderData,
		createdAt: new Date().toISOString()
	})
}

export async function fetchOrdersByUser(uid) {
	try {
		// Query server-side — only this user's orders come down the wire.
		// Requires ".indexOn": ["uid"] in database.rules.json.
		const q = query(ref(db, 'orders'), orderByChild('uid'), equalTo(uid))
		const snapshot = await get(q)
		if (!snapshot.exists()) return []
		return Object.entries(snapshot.val())
			.map(([id, order]) => ({ id, ...order }))
			.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
	} catch {
		return []
	}
}
