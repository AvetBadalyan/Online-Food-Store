import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className="container">
      <motion.div
        className={styles.page}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className={styles.emoji}>🍽️</span>
        <h1 className={styles.code}>404</h1>
        <p className={styles.title}>Page not found</p>
        <p className={styles.sub}>
          Looks like this dish is off the menu. Head back and find something
          delicious.
        </p>
        <Link to="/" className={styles.homeLink}>
          Back to Menu
        </Link>
      </motion.div>
    </div>
  );
}
