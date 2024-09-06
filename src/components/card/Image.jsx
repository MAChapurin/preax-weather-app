import styles from './styles.module.css';

export const Image = ({ item, dark }) => {
	return (
		<img
			className={styles['card__img']}
			style={item.windAngle ? { '--angle': item.windAngle + 45 + 'deg' } : {}}
			src={dark ? item.imgDark : item.img}
			alt='Иконка'
		/>
	);
};
