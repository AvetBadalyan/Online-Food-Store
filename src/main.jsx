import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider
} from 'react-router-dom'
import './index.css'

import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

import Layout from './components/Layout/Layout'
import PrivateRoute from './components/PrivateRoute'

import CheckoutPage from './pages/Checkout/CheckoutPage'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import MealDetailPage from './pages/MealDetail/MealDetailPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import ProfilePage from './pages/Profile/ProfilePage'
import RegisterPage from './pages/Register/RegisterPage'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />}>
			<Route index element={<HomePage />} />
			<Route path="meal/:id" element={<MealDetailPage />} />
			<Route path="login" element={<LoginPage />} />
			<Route path="register" element={<RegisterPage />} />

			<Route element={<PrivateRoute />}>
				<Route path="checkout" element={<CheckoutPage />} />
				<Route path="profile" element={<ProfilePage />} />
			</Route>

			<Route path="*" element={<NotFoundPage />} />
		</Route>
	)
)

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthProvider>
			<CartProvider>
				<RouterProvider router={router} />
			</CartProvider>
		</AuthProvider>
	</StrictMode>
)
