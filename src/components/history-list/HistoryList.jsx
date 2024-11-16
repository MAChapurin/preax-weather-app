import { useWeather } from 'hooks';
import { Icon, Title, WeatherCard } from 'components';

import styles from './styles.module.css';
import { useFavorites } from 'store';

export const HistoryList = ({ getWeather }) => {
	const { history, clearHistory } = useWeather();
	const { favorites, isLiked, handlerDislike, handlerLike } = useFavorites();

	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<Title text={'Недавно смотрели'} />
				<button
					className={styles.button}
					onClick={clearHistory}
					disabled={!history.length}
				>
					<Icon name={'delete'} className={styles.icon} />
				</button>
			</div>
			{history.length === 0 && (
				<p className={styles.placeholder}>История поиска пустая.</p>
			)}
			<ul className={styles.historyList}>
				{history.map((item, index) => (
					<WeatherCard
						key={index}
						name={item.name}
						mainCallBack={() => {
							const { lat, lon, name } = item;
							getWeather(lat, lon, name);
						}}
						supportCallBack={() => {
							isLiked(item.osm_id)
								? handlerDislike(item.osm_id)
								: handlerLike(item);
						}}
						disabled={favorites.length >= 5 && !isLiked(item.osm_id)}
						isChecked={isLiked(item.osm_id)}
						lat={item.lat}
						lon={item.lon}
					/>
				))}
			</ul>
		</div>
	);
};
