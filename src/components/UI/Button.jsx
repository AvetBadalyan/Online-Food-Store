import styles from './Button.module.css'

export default function Button({
	children,
	variant = 'primary',
	size = 'md',
	full = false,
	className = '',
	...props
}) {
	const classes = [
		styles.btn,
		styles[variant],
		size !== 'md' && styles[size],
		full && styles.full,
		className
	]
		.filter(Boolean)
		.join(' ')

	return (
		<button
			className={classes}
			{...props}
		>
			{children}
		</button>
	)
}
