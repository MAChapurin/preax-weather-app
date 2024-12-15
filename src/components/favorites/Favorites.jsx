import { useFavorites } from 'store';
import { Title, WeatherCard } from 'components';

import styles from './styles.module.css';
import { useWeather } from 'store';

export const Favorites = () => {
	const { favorites, handlerLike, isLiked, handlerDislike } = useFavorites();
	const { getWeather } = useWeather();

	return (
		<div>
			{favorites.length > 0 && (
				<div className={styles.header}>
					<Title text={'Избранные'} />
					<div className={styles.count}>{favorites.length}/5</div>
				</div>
			)}
			<ul className={styles.list}>
				{favorites.map((item) => (
					<WeatherCard
						key={item.osm_id}
						name={item.name}
						mainCallBack={() => {
							getWeather(item.lat, item.lon, item.name);
						}}
						supportCallBack={() => {
							isLiked(item.osm_id)
								? handlerDislike(item.osm_id)
								: handlerLike(item);
						}}
						isChecked={isLiked(item.osm_id)}
						disabled={favorites.length >= 5 && !isLiked(item.osm_id)}
						lat={item.lat}
						lon={item.lon}
					/>
				))}
			</ul>
		</div>
	);
};
