import { useEffect, useState } from 'react'
import { fetchMealById } from '../services/mealsService'

export function useMealDetail(id) {
	const [meal, setMeal] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!id) {
			setLoading(false)
			setError('No meal ID provided.')
			return
		}
		let cancelled = false

		setLoading(true)
		setError(null)

		fetchMealById(id)
			.then(data => {
				if (cancelled) return
				if (!data) {
					setError('Meal not found.')
				} else {
					setMeal(data)
				}
				setLoading(false)
			})
			.catch(err => {
				if (!cancelled) {
					setError(err.message ?? 'Something went wrong.')
					setLoading(false)
				}
			})

		return () => {
			cancelled = true
		}
	}, [id])

	return { meal, loading, error }
}
