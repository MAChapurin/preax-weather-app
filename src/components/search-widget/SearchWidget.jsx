import { useFavorites, useWeather } from 'hooks';
import { Skeleton, WeatherCard } from 'components';

import styles from './styles.module.css';

export const SearchWidget = ({ getWeather }) => {
	const { citySearchResult, isCitySearching, error } = useWeather();
	const { favorites, isLiked, handlerDislike, handlerLike } = useFavorites();
	return (
		<>
			{isCitySearching && (
				<div>
					<h3 className={styles.title}>Ищем...</h3>
					<Skeleton variant={'weather'} />
				</div>
			)}
			{citySearchResult && (
				<div>
					<h3 className={styles.title}>Результат поиска</h3>
					<WeatherCard
						name={citySearchResult.name}
						mainCallBack={() =>
							getWeather(
								citySearchResult.lat,
								citySearchResult.lon,
								citySearchResult.name
							)
						}
						supportCallBack={() => {
							console.log('weatherCard support cb searchResult starting');
							isLiked(citySearchResult.osm_id)
								? handlerDislike(citySearchResult.osm_id)
								: handlerLike(citySearchResult);
						}}
						disabled={
							favorites.length >= 5 && !isLiked(citySearchResult.osm_id)
						}
						isChecked={isLiked(citySearchResult.osm_id)}
						lat={citySearchResult.lat}
						lon={citySearchResult.lon}
					/>
				</div>
			)}
			{error && (
				<div>
					<h3 className={styles.title}>Упс город не найден</h3>
					<p className={styles.placeholder}>Попробуйте другое название.</p>
				</div>
			)}
		</>
	);
};
