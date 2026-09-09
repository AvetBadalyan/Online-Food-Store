import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import styles from './CartDrawer.module.css';

const FREE_DELIVERY_THRESHOLD = 30;

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 32 } },
  exit:    { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
};

const itemVariants = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -20, transition: { duration: 0.18 } },
};

export default function CartDrawer({ isOpen, onClose }) {
  const { items, totalAmount, totalItems, addItem, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const remaining = FREE_DELIVERY_THRESHOLD - totalAmount;
  const hasFreeDelivery = totalAmount >= FREE_DELIVERY_THRESHOLD;

  function handleCheckout() {
    onClose();
    navigate('/checkout');
  }

  const portalEl = document.getElementById('overlays');

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className={styles.drawer}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-label="Shopping cart"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.title}>
                <FiShoppingBag size={20} />
                Cart
                {totalItems > 0 && (
                  <span className={styles.badge}>{totalItems}</span>
                )}
              </h2>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
                <FiX size={20} />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>🛒</span>
                <p className={styles.emptyTitle}>Your cart is empty</p>
                <p className={styles.emptyText}>
                  Add some delicious dishes from our menu to get started.
                </p>
              </div>
            ) : (
              <ul className={styles.items}>
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      className={styles.item}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      {/* Image */}
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.itemImg}
                          loading="lazy"
                        />
                      ) : (
                        <div className={styles.itemImgFallback}>
                          <MdRestaurantMenu />
                        </div>
                      )}

                      {/* Info */}
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemPrice}>
                          {formatPrice(item.price * item.amount)}
                        </span>
                      </div>

                      {/* Quantity controls */}
                      <div className={styles.itemControls}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove one ${item.name}`}
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className={styles.qtyValue}>{item.amount}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => addItem({ ...item, amount: 1 })}
                          aria-label={`Add one more ${item.name}`}
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.summaryRow}>
                  <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                  {hasFreeDelivery ? (
                    <span className={styles.freeDelivery}>🎉 Free delivery!</span>
                  ) : (
                    <span>{formatPrice(remaining)} away from free delivery</span>
                  )}
                </div>

                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total</span>
                  <motion.span
                    key={totalAmount}
                    className={styles.totalAmount}
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formatPrice(totalAmount)}
                  </motion.span>
                </div>

                <button className={styles.checkoutBtn} onClick={handleCheckout}>
                  Proceed to Checkout →
                </button>

                <button
                  className={styles.clearBtn}
                  onClick={clearCart}
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    portalEl
  );
}
