import { MEALS } from '../data/meals'

// Meals are static local data — instant, no loading state needed.
export function useMeals() {
	return { meals: MEALS, loading: false, error: null }
}
