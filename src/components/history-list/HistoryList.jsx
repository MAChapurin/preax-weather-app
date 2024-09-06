import { useFavorites } from '../../hooks/useFavoriteContext';
import { useWeather } from '../../hooks/useWeatherContext';
import { Icon } from '../icon/Icon';
import { Title } from '../title/Title';
import { WeatherCard } from '../weather-card/weatherCard';
import styles from './styles.module.css';

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
