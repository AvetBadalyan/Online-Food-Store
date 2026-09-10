import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/UI/Button'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
	const navigate = useNavigate()

	return (
		<div className="container">
			<motion.div
				className={styles.page}
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
			>
				<span className={styles.emoji}>🍽️</span>
				<h1 className={styles.code}>404</h1>
				<p className={styles.title}>Page not found</p>
				<p className={styles.sub}>
					Looks like this dish is off the menu. Head back and find something delicious.
				</p>
				<Button size="lg" onClick={() => navigate('/')}>
					Back to Menu
				</Button>
			</motion.div>
		</div>
	)
}
