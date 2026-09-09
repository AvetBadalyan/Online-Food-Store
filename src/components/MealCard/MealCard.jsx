import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatters'
import { handleImageError } from '../../utils/imageUtils'
import Rating from '../UI/Rating'
import Tag from '../UI/Tag'
import styles from './MealCard.module.css'

export default function MealCard({ meal }) {
	const { addItem } = useCart()
	const navigate = useNavigate()
	const isOutOfStock = meal.countInStock === 0

	function handleCardClick() {
		navigate(`/meal/${meal.id}`)
	}

	function handleAdd(e) {
		// Stop propagation so clicking Add doesn't also navigate to detail
		e.stopPropagation()
		addItem({ ...meal, amount: 1 })
		toast.success(`${meal.name} added to cart`, { icon: '🛒', duration: 2000 })
	}

	return (
		<motion.article
			className={styles.card}
			onClick={handleCardClick}
			role="button"
			tabIndex={0}
			onKeyDown={e => e.key === 'Enter' && handleCardClick()}
			aria-label={`View ${meal.name} details`}
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.3 }}
		>
			{/* Image */}
			<div className={styles.imageWrapper}>
				<img
					src={meal.image}
					alt={meal.name}
					className={styles.image}
					loading="lazy"
					onError={handleImageError}
				/>

				{meal.tags?.length > 0 && (
					<div className={styles.tags}>
						{meal.tags.map(tag => (
							<Tag
								key={tag}
								type={tag}
							/>
						))}
					</div>
				)}

				{isOutOfStock && (
					<div className={styles.outOfStock}>
						<span className={styles.outOfStockLabel}>Out of stock</span>
					</div>
				)}
			</div>

			{/* Body */}
			<div className={styles.body}>
				<span className={styles.category}>{meal.category}</span>
				<h3 className={styles.name}>{meal.name}</h3>
				<p className={styles.description}>{meal.description}</p>
				<div className={styles.ratingRow}>
					<Rating
						value={meal.rating}
						numReviews={meal.numReviews}
					/>
				</div>
			</div>

			{/* Footer */}
			<div className={styles.footer}>
				<span className={styles.price}>{formatPrice(meal.price)}</span>
				<button
					className={styles.addBtn}
					onClick={handleAdd}
					disabled={isOutOfStock}
					aria-label={`Add ${meal.name} to cart`}
				>
					<FiPlus size={15} />
					Add to Cart
				</button>
			</div>
		</motion.article>
	)
}
