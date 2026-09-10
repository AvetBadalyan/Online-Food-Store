import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiAlertCircle, FiLogIn } from 'react-icons/fi'
import { MdRestaurantMenu } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import Loader from '../../components/UI/Loader'
import { useAuth } from '../../context/AuthContext'
import { loginSchema } from '../../validators/authSchemas'
import styles from './LoginPage.module.css'

export default function LoginPage() {
	const { login, isAuthenticated, loading, error, clearError } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()

	// Redirect after login — go back to where the user came from
	const from = location.state?.from?.pathname ?? '/'

	useEffect(() => {
		if (isAuthenticated) navigate(from, { replace: true })
	}, [isAuthenticated, navigate, from])

	useEffect(() => {
		return () => clearError()
	}, [clearError])

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({ resolver: zodResolver(loginSchema) })

	async function onSubmit({ email, password }) {
		try {
			await login(email, password)
		} catch {
			// error is set in AuthContext
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

				<h1 className={styles.title}>Welcome back</h1>
				<p className={styles.subtitle}>
					Sign in to track your orders and checkout faster.
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
						placeholder="••••••••"
						autoComplete="current-password"
						error={errors.password?.message}
						{...register('password')}
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
								<FiLogIn size={16} />
								Sign In
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
					Don't have an account?
					<Link
						to="/register"
						className={styles.switchLink}
					>
						Create one
					</Link>
				</p>

				<div style={{ marginTop: 'var(--space-3)' }}>
					<Link
						to="/"
						className={styles.guestLink}
					>
						Continue as guest →
					</Link>
				</div>
			</motion.div>
		</div>
	)
}
