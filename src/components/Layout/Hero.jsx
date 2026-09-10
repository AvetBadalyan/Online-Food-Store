import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styles from './Hero.module.css'

const HERO_IMAGE =
	'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=85&fit=crop'

export default function Hero({ onScrollToMenu }) {
	const navigate = useNavigate()

	return (
		<section
			className={styles.hero}
			aria-label="Welcome banner"
		>
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
						32+ hand-crafted dishes from around the world, made fresh and
						delivered straight to your door.
					</p>

					<div className={styles.heroActions}>
						{/* Opens cart to start ordering */}
						<button
							className={styles.heroBtn}
							onClick={() => navigate('/?category=Armenian')}
						>
							Order Now
						</button>
						{/* Scrolls down to the menu grid */}
						<button
							className={`${styles.heroBtn} ${styles.heroBtnGhost}`}
							onClick={onScrollToMenu}
						>
							View Menu
						</button>
					</div>
				</motion.div>

				{/* Stats badges — inline below buttons, not overlapping */}
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
						<div
							key={label}
							className={styles.heroBadge}
						>
							<span className={styles.heroBadgeNum}>{num}</span>
							<span className={styles.heroBadgeLabel}>{label}</span>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
