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
			style={{ width, height, borderRadius: `var(--radius-${radius})`, ...style }}
			aria-hidden="true"
		/>
	)
}
