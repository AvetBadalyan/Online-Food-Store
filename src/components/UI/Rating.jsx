import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import styles from './Rating.module.css'

const STAR_COUNT = 5

const STAR_CONFIG = {
	full: { icon: FaStar, class: styles.starFull },
	half: { icon: FaStarHalfAlt, class: styles.starHalf },
	empty: { icon: FaRegStar, class: '' }
}

function getStarType(position, value) {
	if (value >= position) return 'full'
	if (value >= position - 0.5) return 'half'
	return 'empty'
}

export default function Rating({ value = 0, numReviews, size = 14 }) {
	return (
		<div className={styles.wrapper} aria-label={`Rating: ${value} out of 5`}>
			<div className={styles.stars}>
				{Array.from({ length: STAR_COUNT }, (_, i) => {
					const position = i + 1
					const type = getStarType(position, value)
					const { icon: Icon, class: starClass } = STAR_CONFIG[type]
					return (
						<span key={position} className={`${styles.star} ${starClass}`}>
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
