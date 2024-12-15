import { WEATHER_ICONS } from 'assets/img/weather-icons';
import styles from './styles.module.css';
import { useWeather } from 'store';
import { Skeleton } from 'components';

export const CityCard = () => {
	const { cityCardData, loadingDetail } = useWeather();
	const data = cityCardData;
	if (loadingDetail) return <Skeleton variant={'detail'} />;
	return (
		<div className={styles['panel-info']}>
			<div className={styles['panel-info__row']}>
				<h2 className={styles['panel-info__title']}>{data.city}</h2>
				<time dateTime={new Date()} className={styles['panel-info__text']}>
					{data.date}
				</time>
				<time dateTime={data.time} className={styles['panel-info__text']}>
					{data.time}
				</time>
			</div>

			<div className={styles['panel-info__temp']}>{data.temp}</div>

			<div className={styles['panel-info__row']}>
				<div
					className={`${styles['panel-info__text']} ${styles['panel-info__state']}`}
				>
					<img
						className={styles['panel-info__img']}
						src={`${WEATHER_ICONS[data.img.src]}`}
						alt={data.img.alt}
					/>
					<span>{data.img.alt}</span>
				</div>
				<div className={styles['panel-info__text']}>{data.description}</div>
			</div>
		</div>
	);
};
