import styles from './Input.module.css';

export function Input({ label, type, name, value, onChange, onBlur, error }) {
  return (
    <div className={styles['input-wrapper']}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
