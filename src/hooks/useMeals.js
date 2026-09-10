import { MEALS } from '../data/meals'

// Meals are static local data — instant, no network, no loading state.
export function useMeals() {
	return { meals: MEALS }
}
