import styles from './styles.module.css';

export const Skeleton = ({ variant }) => {
	const variants = ['detail', 'card', 'slide', 'weather'];
	if (!variants.includes(variant)) {
		throw new Error('You passed a non-existent props option in Skeleton');
	}
	return (
		<>
			{variant === 'detail' && (
				<div className={styles.detail}>
					<div className={styles.detail__top}>
						<div className={styles.title} datatype='skeleton' />
						<div className={styles.date} datatype='skeleton' />
						<div className={styles.time} datatype='skeleton' />
					</div>

					<div className={styles.degree} datatype='skeleton' />

					<div className={styles.detail__bottom}>
						<div className={styles.status} datatype='skeleton' />
						<div className={styles.feel} datatype='skeleton' />
					</div>
				</div>
			)}
			{variant === 'card' && (
				<div className={styles.card}>
					<div className={styles.card__title} datatype='skeleton' />
					<div className={styles.card__icon} datatype='skeleton' />
					<div className={styles.card__value} datatype='skeleton' />
					<div className={styles.card__bottom} datatype='skeleton' />
				</div>
			)}
			{variant === 'slide' && (
				<div className={styles.slide}>
					<div className={styles.slide__time} datatype='skeleton' />
					<div className={styles.slide__icon} datatype='skeleton' />
					<div className={styles.slide__temp} datatype='skeleton' />
				</div>
			)}
			{variant === 'weather' && (
				<div className={styles.weather}>
					<div className={styles.weather__left}>
						<div className={styles.weather__city} datatype='skeleton' />
						<div className={styles.weather__time} datatype='skeleton' />
					</div>
					<div className={styles.weather__right}>
						<div className={styles.weather__temp} datatype='skeleton' />
						<div className={styles.weather__status} datatype='skeleton' />
					</div>
				</div>
			)}
		</>
	);
};
