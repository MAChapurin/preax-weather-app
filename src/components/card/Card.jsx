import { useTheme } from 'store';
import { ProgressBar } from 'components';
import { Image } from './Image';

import styles from './styles.module.css';

export const Card = ({ item, className = '' }) => {
	const { isDarkTheme } = useTheme();
	return (
		<li className={`${styles['card']} ${className}`}>
			<h3 className={styles['card__header']}>{item.name}</h3>
			{isDarkTheme ? <Image item={item} dark /> : <Image item={item} />}
			<div className={styles['card__value']}>
				{item.value}
				{item.units ? ' ' + item.units : ''}
			</div>
			{item.progress ? (
				<ProgressBar
					type={item.progress.type}
					value={item.value}
					min={item.progress.min}
					max={item.progress.max}
					view={item.progress.view}
					descr={item.description}
				/>
			) : (
				<div className={styles['card__desc']}>{item.description}</div>
			)}
		</li>
	);
};
