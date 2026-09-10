import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiArrowLeft, FiArrowRight, FiCheck, FiCheckCircle } from 'react-icons/fi'
import { MdOutlineDinnerDining } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/UI/Button'
import EmptyState from '../../components/UI/EmptyState'
import Input from '../../components/UI/Input'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { postOrder } from '../../services/mealsService'
import { formatPrice } from '../../utils/formatters'
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '../../utils/orderConstants'
import { checkoutSchema } from '../../validators/checkoutSchema'
import styles from './CheckoutPage.module.css'

// ─── Steps config ─────────────────────────────────────────────────────────────
const STEPS = [
	{ id: 1, label: 'Delivery' },
	{ id: 2, label: 'Payment' },
	{ id: 3, label: 'Review' }
]

const PAYMENT_METHODS = [
	{
		id: 'cash',
		icon: '💵',
		name: 'Cash on Delivery',
		desc: 'Pay when your order arrives'
	},
	{
		id: 'card',
		icon: '💳',
		name: 'Card on Delivery',
		desc: 'Card payment at the door'
	}
]

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepBar({ current }) {
	return (
		<div className={styles.steps} role="list" aria-label="Checkout steps">
			{STEPS.map((step, i) => {
				const isDone = step.id < current
				const isActive = step.id === current
				return (
					<div key={step.id} className={styles.stepItem}>
						<div
							className={`${styles.step} ${isActive ? styles.stepActive : ''} ${isDone ? styles.stepDone : ''}`}
							role="listitem"
							aria-current={isActive ? 'step' : undefined}
						>
							<span className={styles.stepNum}>{isDone ? <FiCheck size={13} /> : step.id}</span>
							<span className={styles.stepLabel}>{step.label}</span>
						</div>
						{i < STEPS.length - 1 && <div className={styles.stepConnector} />}
					</div>
				)
			})}
		</div>
	)
}

// ─── Order summary sidebar ────────────────────────────────────────────────────
function OrderSummary({ items, totalAmount }) {
	const deliveryFee = totalAmount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
	const grandTotal = totalAmount + deliveryFee

	return (
		<div className={styles.summaryCard}>
			<div className={styles.summaryHeader}>Order Summary</div>

			<ul className={styles.summaryItems}>
				{items.map(item => (
					<li key={item.id} className={styles.summaryItem}>
						<span className={styles.summaryItemName}>{item.name}</span>
						<span className={styles.summaryItemQty}>×{item.amount}</span>
						<span className={styles.summaryItemPrice}>{formatPrice(item.price * item.amount)}</span>
					</li>
				))}
			</ul>

			<div className={styles.summaryFooter}>
				<div className={styles.summaryLine}>
					<span>Subtotal</span>
					<span>{formatPrice(totalAmount)}</span>
				</div>
				<div className={styles.summaryLine}>
					<span>Delivery</span>
					<span>{deliveryFee === 0 ? '🎉 Free' : formatPrice(deliveryFee)}</span>
				</div>
				<div className={styles.summaryTotal}>
					<span className={styles.summaryTotalLabel}>Total</span>
					<span className={styles.summaryTotalAmount}>{formatPrice(grandTotal)}</span>
				</div>
			</div>
		</div>
	)
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
	const { items, totalAmount, clearCart } = useCart()
	const { user } = useAuth()

	const [step, setStep] = useState(1)
	const [paymentMethod, setPaymentMethod] = useState('cash')
	const [submitting, setSubmitting] = useState(false)
	const [orderId, setOrderId] = useState(null)

	const deliveryFee = totalAmount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
	const grandTotal = totalAmount + deliveryFee

	const {
		register,
		handleSubmit,
		getValues,
		trigger,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			fullName: user?.displayName ?? '',
			email: user?.email ?? '',
			phone: '',
			street: '',
			city: '',
			postalCode: '',
			country: '',
			notes: ''
		}
	})

	const navigate = useNavigate()

	// Redirect if cart is empty and no orderId
	if (items.length === 0 && !orderId) {
		return (
			<div className="container">
				<EmptyState
					icon={<MdOutlineDinnerDining />}
					title="Your cart is empty"
					description="Add some dishes from our menu before checking out."
					action={<Button onClick={() => navigate('/')}>Browse the Menu</Button>}
				/>
			</div>
		)
	}

	// ─── Step navigation ────────────────────────────────────────
	async function goNext() {
		// Validate step 1 fields before advancing
		if (step === 1) {
			const valid = await trigger([
				'fullName',
				'email',
				'phone',
				'street',
				'city',
				'postalCode',
				'country'
			])
			if (!valid) return
		}
		setStep(s => Math.min(3, s + 1))
	}

	function goBack() {
		setStep(s => Math.max(1, s - 1))
	}

	// ─── Submit order ────────────────────────────────────────────
	async function onSubmit(data) {
		setSubmitting(true)
		try {
			const id = await postOrder({
				uid: user?.uid ?? 'guest',
				user: { name: data.fullName, email: data.email, phone: data.phone },
				address: {
					street: data.street,
					city: data.city,
					postalCode: data.postalCode,
					country: data.country
				},
				notes: data.notes ?? '',
				paymentMethod,
				items,
				subtotal: totalAmount,
				deliveryFee,
				total: grandTotal
			})
			clearCart()
			setOrderId(id)
			toast.success('Order placed successfully!')
		} catch {
			toast.error('Failed to place order. Please try again.')
		} finally {
			setSubmitting(false)
		}
	}

	// ─── Success screen ──────────────────────────────────────────
	if (orderId) {
		return (
			<div className="container">
				<motion.div
					className={styles.success}
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.4 }}
				>
					<span className={styles.successIcon}>🎉</span>
					<h1 className={styles.successTitle}>Order Placed!</h1>
					<p className={styles.successText}>
						Thank you for your order. We're preparing your food and will have it delivered to you
						shortly.
					</p>
					<p className={styles.successOrderId}>
						Order ID: <strong>{orderId}</strong>
					</p>
					<div className={styles.successLinks}>
						<Link to="/" className={styles.successLinkPrimary}>
							Back to Menu
						</Link>
						{user && (
							<Link to="/profile" className={styles.successLinkSecondary}>
								View My Orders
							</Link>
						)}
					</div>
				</motion.div>
			</div>
		)
	}

	const values = getValues()

	return (
		<div className="container">
			<div className={styles.page}>
				<StepBar current={step} />

				<div className={styles.inner}>
					{/* ─── Left: Form ─────────────────────────────────── */}
					<div>
						<form onSubmit={handleSubmit(onSubmit)} noValidate>
							<AnimatePresence mode="wait">
								{/* STEP 1 — Delivery details */}
								{step === 1 && (
									<motion.div
										key="step1"
										className={styles.formPanel}
										initial={{ opacity: 0, x: 24 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -24 }}
										transition={{ duration: 0.25 }}
									>
										<h2 className={styles.formTitle}>Delivery Details</h2>
										<div className={styles.formGrid}>
											<div className={styles.formGridFull}>
												<Input
													label="Full Name"
													placeholder="John Smith"
													error={errors.fullName?.message}
													{...register('fullName')}
												/>
											</div>
											<Input
												label="Email"
												type="email"
												placeholder="john@example.com"
												error={errors.email?.message}
												{...register('email')}
											/>
											<Input
												label="Phone"
												type="tel"
												placeholder="+1 234 567 890"
												error={errors.phone?.message}
												{...register('phone')}
											/>
											<div className={styles.formGridFull}>
												<Input
													label="Street Address"
													placeholder="123 Main St, Apt 4B"
													error={errors.street?.message}
													{...register('street')}
												/>
											</div>
											<Input
												label="City"
												placeholder="Yerevan"
												error={errors.city?.message}
												{...register('city')}
											/>
											<Input
												label="Postal Code"
												placeholder="0001"
												error={errors.postalCode?.message}
												{...register('postalCode')}
											/>
											<div className={styles.formGridFull}>
												<Input
													label="Country"
													placeholder="Armenia"
													error={errors.country?.message}
													{...register('country')}
												/>
											</div>
											<div className={styles.formGridFull}>
												<Input
													as="textarea"
													label="Delivery Notes (optional)"
													placeholder="Ring bell, leave at door, etc."
													error={errors.notes?.message}
													{...register('notes')}
												/>
											</div>
										</div>

										<div className={styles.formActions}>
											<Link to="/" className={styles.backLink}>
												<FiArrowLeft size={14} /> Back to Menu
											</Link>
											<Button type="button" onClick={goNext}>
												Payment <FiArrowRight size={14} />
											</Button>
										</div>
									</motion.div>
								)}

								{/* STEP 2 — Payment */}
								{step === 2 && (
									<motion.div
										key="step2"
										className={styles.formPanel}
										initial={{ opacity: 0, x: 24 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -24 }}
										transition={{ duration: 0.25 }}
									>
										<h2 className={styles.formTitle}>Payment Method</h2>

										<div className={styles.paymentOptions}>
											{PAYMENT_METHODS.map(m => (
												<button
													key={m.id}
													type="button"
													className={`${styles.paymentOption} ${paymentMethod === m.id ? styles.paymentOptionSelected : ''}`}
													onClick={() => setPaymentMethod(m.id)}
													aria-pressed={paymentMethod === m.id}
												>
													<span className={styles.paymentIcon}>{m.icon}</span>
													<span className={styles.paymentInfo}>
														<span className={styles.paymentName}>{m.name}</span>
														<span className={styles.paymentDesc}>{m.desc}</span>
													</span>
													{paymentMethod === m.id && (
														<FiCheckCircle size={20} className={styles.paymentCheck} />
													)}
												</button>
											))}
										</div>

										<div className={styles.formActions}>
											<button type="button" onClick={goBack} className={styles.backLink}>
												<FiArrowLeft size={14} /> Back
											</button>
											<Button type="button" onClick={goNext}>
												Review Order <FiArrowRight size={14} />
											</Button>
										</div>
									</motion.div>
								)}

								{/* STEP 3 — Review & confirm */}
								{step === 3 && (
									<motion.div
										key="step3"
										className={styles.formPanel}
										initial={{ opacity: 0, x: 24 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -24 }}
										transition={{ duration: 0.25 }}
									>
										<h2 className={styles.formTitle}>Review & Confirm</h2>

										<div className={styles.reviewSection}>
											<p className={styles.reviewSectionTitle}>Delivery Address</p>
											<div className={styles.reviewGrid}>
												{[
													['Name', values.fullName],
													['Email', values.email],
													['Phone', values.phone],
													['Street', values.street],
													['City', values.city],
													['Postal Code', values.postalCode],
													['Country', values.country]
												].map(([label, val]) => (
													<div key={label} className={styles.reviewField}>
														<span className={styles.reviewLabel}>{label}</span>
														<span className={styles.reviewValue}>{val || '—'}</span>
													</div>
												))}
											</div>
										</div>

										<div className={styles.reviewSection}>
											<p className={styles.reviewSectionTitle}>Payment</p>
											<p className={styles.reviewValue}>
												{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name}
											</p>
										</div>

										{values.notes && (
											<div className={styles.reviewSection}>
												<p className={styles.reviewSectionTitle}>Delivery Notes</p>
												<p className={styles.reviewValue}>{values.notes}</p>
											</div>
										)}

										<div className={styles.formActions}>
											<button type="button" onClick={goBack} className={styles.backLink}>
												<FiArrowLeft size={14} /> Back
											</button>
											<Button type="submit" disabled={submitting}>
												{submitting ? 'Placing Order…' : 'Place Order'}{' '}
												{!submitting && <FiCheck size={14} />}
											</Button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</form>
					</div>

					{/* ─── Right: Summary sidebar ──────────────────────── */}
					<div className={styles.sidebar}>
						<OrderSummary items={items} totalAmount={totalAmount} />
					</div>
				</div>
			</div>
		</div>
	)
}
