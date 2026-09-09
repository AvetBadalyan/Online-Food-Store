import { MdRestaurantMenu } from 'react-icons/md'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className="container">
				<div className={styles.inner}>
					<div className={styles.brand}>
						<div className={styles.brandLogo}>
							<MdRestaurantMenu
								style={{ marginRight: '6px', verticalAlign: 'middle' }}
							/>
							Avet's <span>Food</span>
						</div>
						<p className={styles.brandTagline}>
							Fresh ingredients, bold flavours, delivered to your door. Order
							from our menu of 40+ dishes crafted with care.
						</p>
					</div>

					<div>
						<p className={styles.colTitle}>Menu</p>
						<ul className={styles.colLinks}>
							{[
								'Armenian',
								'Burgers',
								'Pizza',
								'Sushi',
								'Pasta',
								'Desserts'
							].map(cat => (
								<li key={cat}>
									<Link
										to={`/?category=${cat}`}
										className={styles.colLink}
									>
										{cat}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className={styles.colTitle}>Account</p>
						<ul className={styles.colLinks}>
							<li>
								<Link
									to="/login"
									className={styles.colLink}
								>
									Sign In
								</Link>
							</li>
							<li>
								<Link
									to="/register"
									className={styles.colLink}
								>
									Register
								</Link>
							</li>
							<li>
								<Link
									to="/profile"
									className={styles.colLink}
								>
									My Orders
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className={styles.bottom}>
					<p className={styles.copyright}>
						© {new Date().getFullYear()} Avet's Food Store. All rights reserved.
					</p>
					<p className={styles.madeWith}>
						Built by{' '}
						<a
							href="https://github.com/AvetBadalyan"
							target="_blank"
							rel="noopener noreferrer"
						>
							Avet Badalyan
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
