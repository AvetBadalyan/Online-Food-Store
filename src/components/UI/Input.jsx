import { forwardRef, useState } from 'react'
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi'
import styles from './Input.module.css'

const Input = forwardRef(function Input(
	{ label, error, as: Tag = 'input', type = 'text', className = '', ...props },
	ref
) {
	const [showPassword, setShowPassword] = useState(false)
	const isTextarea = Tag === 'textarea'
	const isPassword = !isTextarea && type === 'password'
	const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type

	return (
		<div className={styles.group}>
			{label && <label className={styles.label}>{label}</label>}
			<div className={styles.inputWrapper}>
				<Tag
					ref={ref}
					// Never pass type to a textarea — it has no type attribute
					{...(!isTextarea && { type: resolvedType })}
					className={[styles.input, error ? styles.hasError : '', className]
						.filter(Boolean)
						.join(' ')}
					{...props}
				/>
				{isPassword && (
					<span
						className={`${styles.icon} ${styles.iconClickable}`}
						onClick={() => setShowPassword(v => !v)}
						role="button"
						aria-label={showPassword ? 'Hide password' : 'Show password'}
					>
						{showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
					</span>
				)}
			</div>
			{error && (
				<span
					className={styles.errorMsg}
					role="alert"
				>
					<FiAlertCircle size={12} />
					{error}
				</span>
			)}
		</div>
	)
})

export default Input
