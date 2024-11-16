import { useWeather } from 'hooks';
import {
	Favorites,
	HistoryList,
	LifeSearchList,
	Location,
	SearchWidget,
} from 'components';

import styles from './styles.module.css';
import { useFavorites } from 'store';

export const Dropdown = ({
	isCitySearching,
	citySearchResult,
	getWeather,
	value,
	setValue,
}) => {
	const { favorites } = useFavorites();
	const { error, isGeoActive } = useWeather();

	const isSearchProcess = citySearchResult || isCitySearching || error;

	const isShowedLiveSearch = value.length >= 3 && !isSearchProcess;

	const isShowedGeo = isGeoActive && !isShowedLiveSearch;

	const isShowedSearchWidget =
		!isGeoActive && isSearchProcess && !isShowedLiveSearch;

	const isShowedFavorites =
		!isGeoActive &&
		favorites.length > 0 &&
		!isSearchProcess &&
		!isShowedLiveSearch;

	const isShowedHistory =
		!isGeoActive && !isSearchProcess && !isShowedLiveSearch;

	return (
		<div className={styles.wrapper}>
			{isShowedLiveSearch && (
				<LifeSearchList value={value} setValue={setValue} />
			)}
			{isShowedSearchWidget && <SearchWidget getWeather={getWeather} />}
			{isShowedGeo && <Location getWeather={getWeather} />}
			{isShowedFavorites && <Favorites getWeather={getWeather} />}
			{isShowedHistory && <HistoryList getWeather={getWeather} />}
		</div>
	);
};
