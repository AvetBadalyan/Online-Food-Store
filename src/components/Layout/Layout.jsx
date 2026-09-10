import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import CartDrawer from '../CartDrawer/CartDrawer'
import Footer from './Footer'
import Header from './Header'
import styles from './Layout.module.css'

export default function Layout() {
	const [cartOpen, setCartOpen] = useState(false)

	return (
		<div className={styles.layout}>
			<Toaster
				position="top-right"
				toastOptions={{
					style: {
						background: 'var(--color-bg-elevated)',
						color: 'var(--color-text)',
						border: '1px solid var(--color-border)',
						fontSize: 'var(--text-sm)'
					},
					success: {
						iconTheme: { primary: 'var(--color-success)', secondary: '#fff' }
					},
					error: {
						iconTheme: { primary: 'var(--color-error)', secondary: '#fff' }
					}
				}}
			/>

			<Header onCartOpen={() => setCartOpen(true)} />

			<main className={styles.main}>
				<Outlet />
			</main>

			<Footer />

			<CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
		</div>
	)
}
