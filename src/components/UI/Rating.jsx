import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import styles from './Rating.module.css'

const STAR_POSITIONS = [1, 2, 3, 4, 5]

function getStarType(position, value) {
	if (value >= position) return 'full'
	if (value >= position - 0.5) return 'half'
	return 'empty'
}

const STAR_ICONS = {
	full: FaStar,
	half: FaStarHalfAlt,
	empty: FaRegStar
}

export default function Rating({ value = 0, numReviews, size = 14 }) {
	return (
		<div
			className={styles.wrapper}
			aria-label={`Rating: ${value} out of 5`}
		>
			<div className={styles.stars}>
				{STAR_POSITIONS.map(position => {
					const type = getStarType(position, value)
					const Icon = STAR_ICONS[type]
					return (
						<span
							key={position}
							className={`${styles.star} ${type !== 'empty' ? styles[`star${type.charAt(0).toUpperCase()}${type.slice(1)}`] : ''}`}
						>
							<Icon size={size} />
						</span>
					)
				})}
			</div>
			{numReviews !== undefined && (
				<span className={styles.text}>
					{value.toFixed(1)} ({numReviews})
				</span>
			)}
		</div>
	)
}
