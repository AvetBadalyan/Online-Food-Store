import styles from './Skeleton.module.css'

export function SkeletonBlock({
	width = '100%',
	height = '14px',
	radius = 'sm',
	className = '',
	style = {}
}) {
	return (
		<div
			className={`${styles.skeleton} ${className}`}
			style={{
				width,
				height,
				borderRadius: `var(--radius-${radius})`,
				...style
			}}
			aria-hidden="true"
		/>
	)
}

export function MealCardSkeleton() {
	return (
		<div
			className={styles.card}
			aria-hidden="true"
		>
			<div className={styles.cardImage} />
			<div className={styles.cardBody}>
				<div className={styles.lineMedium} />
				<div className={styles.lineShort} />
				<div className={styles.lineFull} />
				<div className={styles.lineXs} />
				<div className={styles.btnSkeleton} />
			</div>
		</div>
	)
}
