import { useFavorites, useWeather } from 'store';
import { Skeleton, WeatherCard } from 'components';

import styles from './styles.module.css';

export const SearchWidget = () => {
	const { citySearchResult, isCitySearching, error, getWeather } = useWeather();
	const { favorites, isLiked, handlerDislike, handlerLike } = useFavorites();

	const mainCallBack = () =>
		getWeather(
			citySearchResult.lat,
			citySearchResult.lon,
			citySearchResult.name
		);

	const supportCallBack = () => {
		isLiked(citySearchResult.osm_id)
			? handlerDislike(citySearchResult.osm_id)
			: handlerLike(citySearchResult);
	};

	const isDisabled = favorites.length >= 5 && !isLiked(citySearchResult.osm_id);
	const isChecked = isLiked(citySearchResult.osm_id);

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
						mainCallBack={mainCallBack}
						supportCallBack={supportCallBack}
						disabled={isDisabled}
						isChecked={isChecked}
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
