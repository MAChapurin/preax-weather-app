import styles from './styles.module.css';

export const Image = ({ item }) => {
	return (
		<img
			className={styles['card__img']}
			style={item.windAngle ? { '--angle': item.windAngle + 45 + 'deg' } : {}}
			src={item.img}
			alt='Иконка'
		/>
	);
};
