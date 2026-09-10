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

		setLoading(true)
		setError(null)

		fetchMealById(id).then(data => {
			if (data) {
				setMeal(data)
			} else {
				setError('Meal not found.')
			}
			setLoading(false)
		})
	}, [id])

	return { meal, loading, error }
}
