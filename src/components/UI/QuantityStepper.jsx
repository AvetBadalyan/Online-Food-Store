import { FiMinus, FiPlus } from 'react-icons/fi'
import styles from './QuantityStepper.module.css'

/**
 * Reusable quantity stepper (− value +).
 *
 * variant:
 *   'separate' — each button carries its own border (used in the cart drawer)
 *   'grouped'  — borderless buttons inside a bordered pill (used on meal detail)
 * size: 'sm' (28px) | 'md' (32px)
 */
export default function QuantityStepper({
	value,
	onDecrement,
	onIncrement,
	disableDecrement = false,
	disableIncrement = false,
	variant = 'separate',
	size = 'sm',
	decrementLabel = 'Decrease quantity',
	incrementLabel = 'Increase quantity'
}) {
	const iconSize = size === 'md' ? 14 : 12

	const controls = [
		styles.controls,
		styles[variant],
		styles[size]
	].join(' ')

	return (
		<div className={controls}>
			<button
				type="button"
				className={styles.btn}
				onClick={onDecrement}
				disabled={disableDecrement}
				aria-label={decrementLabel}
			>
				<FiMinus size={iconSize} />
			</button>
			<span className={styles.value}>{value}</span>
			<button
				type="button"
				className={styles.btn}
				onClick={onIncrement}
				disabled={disableIncrement}
				aria-label={incrementLabel}
			>
				<FiPlus size={iconSize} />
			</button>
		</div>
	)
}
