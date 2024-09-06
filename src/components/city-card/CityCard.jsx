import styles from './styles.module.css';

const CityCard = ({ data }) => {
  return (
    <div className={styles['panel-info']}>
      <div className={styles['panel-info__row']}>
        <div className={styles['panel-info__title']}>{data.city}</div>
        <div className={styles['panel-info__text']}>{data.date}</div>
        <div className={styles['panel-info__text']}>{data.time}</div>
      </div>

      <div className={styles['panel-info__temp']}>{data.temp}</div>

      <div className={styles['panel-info__row']}>
        <div className={`${styles['panel-info__text']} ${styles['panel-info__state']}`}>
          <img className={styles['panel-info__img']} src={data.img.src} alt={data.img.alt} />
          {data.img.alt}
        </div>
        <div className={styles['panel-info__text']}>{data.description}</div>
      </div>
    </div>
  );
};

export default CityCard;