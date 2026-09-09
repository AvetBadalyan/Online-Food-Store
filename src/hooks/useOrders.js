import { useEffect, useState } from 'react';
import { fetchOrdersByUser } from '../services/mealsService';

export function useOrders(uid) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) return;
    let cancelled = false;

    setLoading(true);
    fetchOrdersByUser(uid)
      .then((data) => {
        if (!cancelled) {
          setOrders(data);
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
  }, [uid]);

  return { orders, loading, error };
}
