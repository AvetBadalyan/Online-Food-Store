import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/UI/Button'
import QuantityStepper from '../../components/UI/QuantityStepper'
import Rating from '../../components/UI/Rating'
import { SkeletonBlock } from '../../components/UI/Skeleton'
import Tag from '../../components/UI/Tag'
import { useCart } from '../../context/CartContext'
import { useMealDetail } from '../../hooks/useMealDetail'
import { formatPrice } from '../../utils/formatters'
import styles from './MealDetailPage.module.css'

export default function MealDetailPage() {
	const { id } = useParams()
	const { meal, loading, error } = useMealDetail(id)
	const { addItem } = useCart()
	const [quantity, setQuantity] = useState(1)

	function handleAdd() {
		addItem({ ...meal, amount: quantity })
		toast.success(`${meal.name} ×${quantity} added to cart`, { icon: '🛒' })
	}

	if (loading) {
		return (
			<div className="container">
				<div className={styles.page}>
					<SkeletonBlock
						width="120px"
						height="36px"
						className={styles.skeletonBackBtn}
					/>
					<div className={styles.layout}>
						<SkeletonBlock
							height="380px"
							radius="xl"
						/>
						<div className={styles.skeletonInfoCol}>
							<SkeletonBlock
								width="60%"
								height="20px"
							/>
							<SkeletonBlock
								width="90%"
								height="48px"
							/>
							<SkeletonBlock height="80px" />
							<SkeletonBlock
								height="160px"
								radius="xl"
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (error || !meal) {
		return (
			<div className="container">
				<div className={styles.page}>
					<p className={styles.errorMsg}>{error ?? 'Meal not found.'}</p>
					<Link
						to="/"
						className={styles.backBtn}
					>
						<FiArrowLeft size={15} /> Back to menu
					</Link>
				</div>
			</div>
		)
	}

	const isOutOfStock = meal.countInStock === 0
	const maxQty = Math.min(meal.countInStock, 10)

	return (
		<div className="container">
			<motion.div
				className={styles.page}
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
			>
				<Link
					to="/"
					className={styles.backBtn}
				>
					<FiArrowLeft size={15} />
					Back to menu
				</Link>

				<div className={styles.layout}>
					{/* Image column */}
					<div className={styles.imageCol}>
						<div className={styles.imageWrapper}>
							<img
								src={meal.image}
								alt={meal.name}
								className={styles.image}
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
						</div>
					</div>

					{/* Info column */}
					<div className={styles.infoCol}>
						<span className={styles.category}>{meal.category}</span>
						<h1 className={styles.name}>{meal.name}</h1>
						<p className={styles.description}>{meal.description}</p>

						<div className={styles.meta}>
							<Rating
								value={meal.rating}
								numReviews={meal.numReviews}
							/>
							<div className={styles.divider} />
							<span
								className={`${styles.stockBadge} ${
									isOutOfStock ? styles.outOfStock : styles.inStock
								}`}
							>
								{isOutOfStock
									? 'Out of stock'
									: `${meal.countInStock} available`}
							</span>
						</div>

						{/* Order panel */}
						<div className={styles.orderPanel}>
							<div className={styles.priceRow}>
								<span className={styles.price}>{formatPrice(meal.price)}</span>
								<span className={styles.perPerson}>per serving</span>
							</div>

							{!isOutOfStock && (
								<div className={styles.quantityRow}>
									<span className={styles.quantityLabel}>Quantity</span>
									<QuantityStepper
										value={quantity}
										variant="grouped"
										size="md"
										onDecrement={() => setQuantity(q => Math.max(1, q - 1))}
										onIncrement={() =>
											setQuantity(q => Math.min(maxQty, q + 1))
										}
										disableDecrement={quantity <= 1}
										disableIncrement={quantity >= maxQty}
									/>
								</div>
							)}

							<Button
								size="lg"
								full
								onClick={handleAdd}
								disabled={isOutOfStock}
							>
								<FiShoppingCart size={18} />
								{isOutOfStock
									? 'Out of Stock'
									: `Add ${quantity > 1 ? `×${quantity}` : ''} to Cart — ${formatPrice(meal.price * quantity)}`}
							</Button>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
