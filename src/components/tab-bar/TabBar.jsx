import styles from './styles.module.css'

export const TabBar = ({ tab, setTab }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Прогноз:</h2>
      <button className={`${styles['tab']} ${tab === 1 ? styles['active'] : ''} btn-reset`} onClick={() => setTab(1)} tabIndex="0" aria-label="Недельный прогноз">на 24 часа</button>
      <button className={`${styles['tab']} ${tab === 2 ? styles['active'] : ''} btn-reset`} onClick={() => setTab(2)} tabIndex="0" aria-label="Почасовой прогноз">на 5 дней</button>
    </div>
  )
}