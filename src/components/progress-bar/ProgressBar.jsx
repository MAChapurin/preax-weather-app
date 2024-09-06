import styles from './styles.module.css'

const CardProgressScale = () => {
  return (
    <div className={styles['card__row']}>
      <div className={styles['card__desc']}>0%</div>
      <div className={styles['card__desc']}>100%</div>
    </div>
  )
}

const checkValue = (value, min, max) => {
  value = (value - min) / (max - min) * 100;

  if (value < 0) {
    return 0;
  }
  if (value > 100) {
    return 100;
  }
  return value;
}

export const ProgressBar = ({ type, value, min, max, view, descr }) => {
  return (
    <div className={styles['card__progress-line-wrapper']}>
      <div className={`${styles['progress-line']} ${styles['progress-line--' + type]}`} style={
        { '--progress-position': checkValue(value, min, max) + '%' }
      }></div>
      {
        view === 'scale'
          ? <CardProgressScale />
          : <div className={styles['card__desc']}>{descr}</div>
      }
    </div>
  )
}