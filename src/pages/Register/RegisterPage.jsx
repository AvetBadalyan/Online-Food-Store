import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiAlertCircle, FiUserPlus } from 'react-icons/fi'
import { MdRestaurantMenu } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/UI/Input'
import Loader from '../../components/UI/Loader'
import { useAuth } from '../../context/AuthContext'
import { registerSchema } from '../../validators/authSchemas'
// Reuse the same CSS as Login — identical layout
import styles from '../Login/LoginPage.module.css'

export default function RegisterPage() {
	const {
		register: registerUser,
		isAuthenticated,
		loading,
		error,
		clearError
	} = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuthenticated) navigate('/', { replace: true })
	}, [isAuthenticated, navigate])

	useEffect(() => {
		return () => clearError()
	}, [clearError])

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({ resolver: zodResolver(registerSchema) })

	async function onSubmit({ displayName, email, password }) {
		try {
			await registerUser(email, password, displayName)
		} catch {
			// error handled in AuthContext
		}
	}

	return (
		<div className={styles.page}>
			<motion.div
				className={styles.card}
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.35 }}
			>
				<div className={styles.logo}>
					<span className={styles.logoIcon}>
						<MdRestaurantMenu />
					</span>
				</div>

				<h1 className={styles.title}>Create account</h1>
				<p className={styles.subtitle}>
					Join to save your orders and checkout in seconds.
				</p>

				{error && (
					<div
						className={styles.errorBanner}
						role="alert"
					>
						<FiAlertCircle size={15} />
						{error}
					</div>
				)}

				<form
					className={styles.form}
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<Input
						label="Full Name"
						type="text"
						placeholder="John Smith"
						autoComplete="name"
						error={errors.displayName?.message}
						{...register('displayName')}
					/>
					<Input
						label="Email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						error={errors.email?.message}
						{...register('email')}
					/>
					<Input
						label="Password"
						type="password"
						placeholder="min. 6 characters"
						autoComplete="new-password"
						error={errors.password?.message}
						{...register('password')}
					/>
					<Input
						label="Confirm Password"
						type="password"
						placeholder="••••••••"
						autoComplete="new-password"
						error={errors.confirmPassword?.message}
						{...register('confirmPassword')}
					/>

					<Button
						type="submit"
						size="lg"
						full
						style={{ marginTop: 'var(--space-2)' }}
						disabled={isSubmitting || loading}
					>
						{isSubmitting || loading ? (
							<Loader inline />
						) : (
							<>
								<FiUserPlus size={16} />
								Create Account
							</>
						)}
					</Button>
				</form>

				<div className={styles.divider}>
					<div className={styles.dividerLine} />
					<span className={styles.dividerText}>or</span>
					<div className={styles.dividerLine} />
				</div>

				<p className={styles.switchText}>
					Already have an account?
					<Link
						to="/login"
						className={styles.switchLink}
					>
						Sign in
					</Link>
				</p>
			</motion.div>
		</div>
	)
}
