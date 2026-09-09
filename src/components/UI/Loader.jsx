import styles from './Loader.module.css';

export default function Loader({ inline = false }) {
  if (inline) return <span className={styles.inline} aria-hidden="true" />;
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading">
      <div className={styles.spinner} />
    </div>
  );
}
