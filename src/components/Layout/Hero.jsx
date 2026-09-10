import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { useCart } from '../../context/CartContext'
import { MEALS } from '../../data/meals'
import styles from './Hero.module.css'

const HERO_IMAGE =
	'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=85&fit=crop'

// Pre-filter at module level — never changes
const TOP_RATED_MEALS = MEALS.filter(m => m.rating >= 4.7)

export default function Hero() {
	const { addItem } = useCart()
	const timerRef = useRef(null)

	// Clear any pending timer on unmount
	useEffect(() => {
		return () => clearTimeout(timerRef.current)
	}, [])

	function handleSurpriseMe() {
		const meal = TOP_RATED_MEALS[Math.floor(Math.random() * TOP_RATED_MEALS.length)]
		addItem({ ...meal, amount: 1 })
		toast.success(`Added ${meal.name} to your cart!`)
	}

	return (
		<section className={styles.hero} aria-label="Welcome banner">
			<img
				src={HERO_IMAGE}
				alt="Assorted delicious food spread"
				className={styles.heroImg}
				loading="eager"
			/>
			<div className={styles.heroOverlay} />

			<div className={`container ${styles.heroContent}`}>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<p className={styles.heroEyebrow}>
						<span className={styles.heroDot} />
						Free delivery on orders over $30
					</p>

					<h1 className={styles.heroTitle}>
						Food that <span>tastes</span>
						<br />
						like home
					</h1>

					<p className={styles.heroSub}>
						32+ hand-crafted dishes from around the world, made fresh and delivered straight to your
						door.
					</p>

					<div className={styles.heroActions}>
						<button className={styles.heroBtn} onClick={handleSurpriseMe}>
							<GiPerspectiveDiceSixFacesRandom size={20} />
							Surprise Me
						</button>
					</div>
				</motion.div>

				<motion.div
					className={styles.heroBadges}
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.5 }}
				>
					{[
						{ num: '32+', label: 'Dishes' },
						{ num: '4.8★', label: 'Rating' },
						{ num: '30min', label: 'Delivery' }
					].map(({ num, label }) => (
						<div key={label} className={styles.heroBadge}>
							<span className={styles.heroBadgeNum}>{num}</span>
							<span className={styles.heroBadgeLabel}>{label}</span>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
