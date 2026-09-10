import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
	FiCalendar,
	FiCheckCircle,
	FiClock,
	FiCreditCard,
	FiLogOut,
	FiMail,
	FiPackage,
	FiUser
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import EmptyState from '../../components/UI/EmptyState'
import Loader from '../../components/UI/Loader'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../hooks/useOrders'
import { formatDate, formatPrice } from '../../utils/formatters'
import styles from './ProfilePage.module.css'

function getInitials(name) {
	if (!name) return '?'
	return name
		.split(' ')
		.map(w => w[0])
		.slice(0, 2)
		.join('')
		.toUpperCase()
}

function OrderCard({ order }) {
	const isDelivered = order.status === 'delivered'
	const items = order.items ?? []

	return (
		<motion.div
			className={styles.orderCard}
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className={styles.orderCardHeader}>
				<div>
					<p className={styles.orderId}>
						Order <span>#{order.id}</span>
					</p>
					<p className={styles.orderDate}>{formatDate(order.createdAt)}</p>
				</div>
				<span
					className={`${styles.orderStatus} ${isDelivered ? styles.statusDelivered : styles.statusPending}`}
				>
					{isDelivered ? (
						<>
							<FiCheckCircle size={11} /> Delivered
						</>
					) : (
						<>
							<FiClock size={11} /> In Progress
						</>
					)}
				</span>
			</div>

			<div className={styles.orderCardBody}>
				<ul className={styles.orderItems}>
					{items.map(item => (
						<li key={item.id ?? item.name} className={styles.orderItem}>
							<span className={styles.orderItemName}>
								{item.name}
								<span className={styles.orderItemQty}>×{item.amount}</span>
							</span>
							<span className={styles.orderItemPrice}>{formatPrice(item.price * item.amount)}</span>
						</li>
					))}
				</ul>

				{order.address && (
					<p className={styles.orderAddress}>
						📍 {order.address.street}, {order.address.city}, {order.address.country}
					</p>
				)}

				<div className={styles.orderCardFooter}>
					<p className={styles.orderTotal}>
						Total: <span>{formatPrice(order.total)}</span>
					</p>
					<p className={styles.orderPayment}>
						<FiCreditCard size={11} />
						{order.paymentMethod === 'cash' ? 'Cash on delivery' : 'Card on delivery'}
					</p>
				</div>
			</div>
		</motion.div>
	)
}

export default function ProfilePage() {
	const { user, logout } = useAuth()
	const { orders, loading } = useOrders(user?.uid)
	const navigate = useNavigate()

	async function handleLogout() {
		await logout()
		toast.success('Logged out')
		navigate('/')
	}

	const joinedDate = user?.metadata?.creationTime
		? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long'
			})
		: null

	return (
		<div className="container">
			<motion.div
				className={styles.page}
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.35 }}
			>
				{/* ─── Profile header ──────────────────────────────── */}
				<div className={styles.profileHeader}>
					<div className={styles.avatar}>{getInitials(user?.displayName)}</div>
					<div className={styles.userInfo}>
						<h1 className={styles.userName}>{user?.displayName ?? 'Guest'}</h1>
						<p className={styles.userEmail}>{user?.email}</p>
					</div>
				</div>

				{/* ─── Two-column layout ───────────────────────────── */}
				<div className={styles.profileLayout}>
					{/* Left: account details card */}
					<aside className={styles.accountCard}>
						<h2 className={styles.sectionTitle}>
							<FiUser size={18} />
							Account
						</h2>

						<ul className={styles.accountDetails}>
							<li className={styles.accountDetail}>
								<span className={styles.accountDetailIcon}>
									<FiUser size={14} />
								</span>
								<div>
									<span className={styles.accountDetailLabel}>Name</span>
									<span className={styles.accountDetailValue}>{user?.displayName ?? '—'}</span>
								</div>
							</li>
							<li className={styles.accountDetail}>
								<span className={styles.accountDetailIcon}>
									<FiMail size={14} />
								</span>
								<div>
									<span className={styles.accountDetailLabel}>Email</span>
									<span className={styles.accountDetailValue}>{user?.email}</span>
								</div>
							</li>
							{joinedDate && (
								<li className={styles.accountDetail}>
									<span className={styles.accountDetailIcon}>
										<FiCalendar size={14} />
									</span>
									<div>
										<span className={styles.accountDetailLabel}>Member since</span>
										<span className={styles.accountDetailValue}>{joinedDate}</span>
									</div>
								</li>
							)}
							<li className={styles.accountDetail}>
								<span className={styles.accountDetailIcon}>
									<FiPackage size={14} />
								</span>
								<div>
									<span className={styles.accountDetailLabel}>Total orders</span>
									<span className={styles.accountDetailValue}>{orders.length}</span>
								</div>
							</li>
						</ul>

						<button className={styles.logoutBtn} onClick={handleLogout}>
							<FiLogOut size={15} />
							Log out
						</button>
					</aside>

					{/* Right: order history */}
					<div className={styles.ordersSection}>
						<h2 className={styles.sectionTitle}>
							<FiPackage size={18} />
							Order History
							{orders.length > 0 && <span className={styles.orderCount}>{orders.length}</span>}
						</h2>

						{loading ? (
							<Loader />
						) : orders.length === 0 ? (
							<EmptyState
								icon="🍽️"
								title="No orders yet"
								description="Your order history will appear here after you place your first order."
								action={
									<Link to="/" className={styles.emptyOrdersLink}>
										Browse the menu →
									</Link>
								}
							/>
						) : (
							<div className={styles.orders}>
								{orders.map(order => (
									<OrderCard key={order.id} order={order} />
								))}
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	)
}
