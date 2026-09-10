import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from './UI/Loader'

/**
 * Wraps protected routes — redirects unauthenticated users to /login.
 * Preserves the attempted location so users return after logging in.
 */
export default function PrivateRoute() {
	const { isAuthenticated, loading } = useAuth()
	const location = useLocation()

	if (loading) {
		return <Loader />
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />
	}

	return <Outlet />
}
