import { useEffect, useState } from 'react';
import { fetchMealById } from '../services/mealsService';

export function useMealDetail(id) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchMealById(id)
      .then((data) => {
        if (!cancelled) {
          setMeal(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { meal, loading, error };
}
