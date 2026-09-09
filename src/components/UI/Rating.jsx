import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styles from './Rating.module.css';

export default function Rating({ value = 0, numReviews, size = 14 }) {
  const stars = [1, 2, 3, 4, 5].map((star) => {
    if (value >= star) return 'full';
    if (value >= star - 0.5) return 'half';
    return 'empty';
  });

  return (
    <div className={styles.wrapper} aria-label={`Rating: ${value} out of 5`}>
      <div className={styles.stars}>
        {stars.map((type, i) => (
          <span
            key={i}
            className={`${styles.star} ${
              type === 'full'
                ? styles.starFull
                : type === 'half'
                ? styles.starHalf
                : ''
            }`}
          >
            {type === 'full' ? (
              <FaStar size={size} />
            ) : type === 'half' ? (
              <FaStarHalfAlt size={size} />
            ) : (
              <FaRegStar size={size} />
            )}
          </span>
        ))}
      </div>
      {numReviews !== undefined && (
        <span className={styles.text}>
          {value.toFixed(1)} ({numReviews})
        </span>
      )}
    </div>
  );
}
