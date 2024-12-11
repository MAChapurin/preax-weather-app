import { useFavorites, useWeather } from 'store';
import {
	Favorites,
	HistoryList,
	LifeSearchList,
	Location,
	SearchWidget,
} from 'components';

import styles from './styles.module.css';

export const Dropdown = () => {
	const { favorites } = useFavorites();
	const {
		error,
		debounceValue,
		citySearchResult,
		isCitySearching,
		isGeoActive,
		isDropdownOpen,
	} = useWeather();

	if (!isDropdownOpen) return null;

	const value = debounceValue;

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
			{isShowedLiveSearch && <LifeSearchList />}
			{isShowedSearchWidget && <SearchWidget />}
			{isShowedGeo && <Location />}
			{isShowedFavorites && <Favorites />}
			{isShowedHistory && <HistoryList />}
		</div>
	);
};
