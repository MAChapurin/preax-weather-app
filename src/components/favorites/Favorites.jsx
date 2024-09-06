import { WeatherCard } from '../weather-card/weatherCard';
import { useFavorites } from '../../hooks/useFavoriteContext';

import styles from './styles.module.css';
import { Title } from '../title/Title';

export const Favorites = ({ getWeather }) => {
	const { favorites, handlerLike, isLiked, handlerDislike } = useFavorites();
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
