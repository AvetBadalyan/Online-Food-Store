import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'
import styles from './Modal.module.css'

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 }
}

const modalVariants = {
	hidden: { opacity: 0, scale: 0.94, y: 16 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 300, damping: 28 }
	},
	exit: { opacity: 0, scale: 0.94, y: 16, transition: { duration: 0.18 } }
}

export default function Modal({ isOpen, onClose, title, children }) {
	const portalEl = document.getElementById('overlays')

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						className={styles.backdrop}
						variants={backdropVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						onClick={onClose}
					/>
					<motion.div
						className={styles.modal}
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-title"
					>
						<div className={styles.header}>
							{title && (
								<h2
									id="modal-title"
									className={styles.title}
								>
									{title}
								</h2>
							)}
							<button
								className={styles.closeBtn}
								onClick={onClose}
								aria-label="Close modal"
							>
								<FiX size={20} />
							</button>
						</div>
						{children}
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		portalEl
	)
}
