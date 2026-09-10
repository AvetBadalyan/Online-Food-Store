import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import {
	FiChevronDown,
	FiLogOut,
	FiMenu,
	FiShoppingBag,
	FiUser,
	FiX
} from 'react-icons/fi'
import { MdRestaurantMenu } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import styles from './Header.module.css'

export default function Header({ onCartOpen }) {
	const { totalItems } = useCart()
	const { user, isAuthenticated, logout } = useAuth()
	const navigate = useNavigate()

	const [mobileOpen, setMobileOpen] = useState(false)
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [isBump, setIsBump] = useState(false)

	const prevItems = useRef(totalItems)
	const dropdownRef = useRef(null)

	// Cart badge bump on item add
	useEffect(() => {
		if (totalItems > prevItems.current) {
			setIsBump(true)
			const t = setTimeout(() => setIsBump(false), 300)
			return () => clearTimeout(t)
		}
		prevItems.current = totalItems
	}, [totalItems])

	// Close dropdown on outside click
	useEffect(() => {
		function handleClick(e) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [])

	async function handleLogout() {
		setDropdownOpen(false)
		await logout()
		toast.success('Logged out')
		navigate('/')
	}

	return (
		<header className={styles.header}>
			<div className={`container ${styles.inner}`}>
				{/* Logo */}
				<Link
					to="/"
					className={styles.logo}
				>
					<span className={styles.logoIcon}>
						<MdRestaurantMenu />
					</span>
					<span className={styles.logoText}>
						Avet's <span>Food</span>
					</span>
				</Link>

				{/* Actions */}
				<div className={styles.actions}>
					{/* Cart */}
					<button
						className={`${styles.cartBtn} ${isBump ? styles.bump : ''}`}
						onClick={onCartOpen}
						aria-label={`Open cart, ${totalItems} items`}
					>
						<FiShoppingBag size={17} />
						<span>Cart</span>
						{totalItems > 0 && (
							<span className={styles.cartBadge}>{totalItems}</span>
						)}
					</button>

					{/* Auth */}
					{isAuthenticated ? (
						<div
							className={styles.userMenu}
							ref={dropdownRef}
						>
							<button
								className={styles.userBtn}
								onClick={() => setDropdownOpen(v => !v)}
								aria-expanded={dropdownOpen}
								aria-haspopup="true"
							>
								<FiUser size={15} />
								<span>{user?.displayName?.split(' ')[0] ?? 'Account'}</span>
								<FiChevronDown size={13} />
							</button>

							<AnimatePresence>
								{dropdownOpen && (
									<motion.div
										className={styles.dropdown}
										initial={{ opacity: 0, y: -6 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -6 }}
										transition={{ duration: 0.15 }}
									>
										<Link
											to="/profile"
											className={styles.dropdownItem}
											onClick={() => setDropdownOpen(false)}
										>
											<FiUser size={14} />
											My Profile
										</Link>
										<div className={styles.dropdownDivider} />
										<button
											className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
											onClick={handleLogout}
										>
											<FiLogOut size={14} />
											Log out
										</button>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					) : (
						<Link
							to="/login"
							className={styles.userBtn}
						>
							<FiUser size={15} />
							<span>Sign in</span>
						</Link>
					)}

					{/* Mobile hamburger */}
					<button
						className={styles.menuToggle}
						onClick={() => setMobileOpen(v => !v)}
						aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={mobileOpen}
					>
						{mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
					</button>
				</div>
			</div>

			{/* Mobile nav */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.nav
						className={styles.mobileNav}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						aria-label="Mobile navigation"
					>
						<Link
							to="/"
							className={styles.navLink}
							onClick={() => setMobileOpen(false)}
						>
							Menu
						</Link>
						{isAuthenticated ? (
							<>
								<Link
									to="/profile"
									className={styles.navLink}
									onClick={() => setMobileOpen(false)}
								>
									My Profile
								</Link>
								<button
									className={`${styles.navLink} ${styles.dropdownLogout}`}
									style={{ textAlign: 'left' }}
									onClick={handleLogout}
								>
									Log out
								</button>
							</>
						) : (
							<Link
								to="/login"
								className={styles.navLink}
								onClick={() => setMobileOpen(false)}
							>
								Sign in
							</Link>
						)}
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	)
}
