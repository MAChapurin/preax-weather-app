import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { cityCardMock, weatherMock } from '../data';

import { ApiServices } from 'api';
import {
	formatCityCardData,
	formatDayWeather,
	formatTodayDetailsData,
	formatWeekData,
	getCityName,
	loadMapFromSessionStorage,
	saveMapToSessionStorage,
	loadMapFromLocalStorage,
	saveMapToLocalStorage,
} from 'utils';

import { useDebounceValue } from 'hooks';

import { STORAGE_KEYS } from 'constants';
import { MOSCOW_COORDS } from 'constants';

const subscribers = new Set();

const emitChange = () => {
	subscribers.forEach((callback) => {
		callback();
	});
};

const cacheCityData = loadMapFromLocalStorage(STORAGE_KEYS.cacheCityData);
const cacheWeatherData = loadMapFromSessionStorage(
	STORAGE_KEYS.cacheWeatherData
);
const cacheWeatherWeekData = loadMapFromSessionStorage(
	STORAGE_KEYS.cacheWeatherWeekData
);

const defaultCityData = localStorage.getItem(STORAGE_KEYS.defaultCity);
const initialDefaultCityState = defaultCityData
	? JSON.parse(defaultCityData)
	: MOSCOW_COORDS;

let value = '';
let error = null;
let loadingDetail = false;
let loadingWeek = false;
let isDropdownOpen = false;
let history = [];
let isCitySearching = false;
let citySearchResult = null;
let cityCardData = cityCardMock;
let todayDetailsData = weatherMock;
let dayDetailData = null;
let weekData = null;
let lastCity = null;
let defaultCity = initialDefaultCityState;
let isGeoActive = false;

const weatherStore = {
	subscribe(callback) {
		subscribers.add(callback);
		return () => subscribers.delete(callback);
	},
	//state====================================
	getValue: () => value,
	getError: () => error,
	getLoadingDetail: () => loadingDetail,
	getLoadingWeek: () => loadingWeek,
	getIsDropdownOpen: () => isDropdownOpen,
	getHistory: () => history,
	getIsCitySearching: () => isCitySearching,
	getCitySearchResult: () => citySearchResult,
	getCityCardData: () => cityCardData,
	getTodayDetailsData: () => todayDetailsData,
	getDayDetailData: () => dayDetailData,
	getWeekData: () => weekData,
	getLastCity: () => lastCity,
	getDefaultCity: () => defaultCity,
	getIsGeoActive: () => isGeoActive,
	//===========================================
	//setState===================================
	setValue(newValue) {
		value = newValue;
		emitChange();
	},
	setError(value) {
		error = value;
		emitChange();
	},
	setLoadingDetail(value) {
		loadingDetail = value;
		emitChange();
	},
	setLoadingWeek(value) {
		loadingWeek = value;
		emitChange();
	},
	setIsDropdownOpen(value) {
		isDropdownOpen = value;
		emitChange();
	},
	setHistory(value) {
		history = value;
		emitChange();
	},
	setIsCitySearching(value) {
		isCitySearching = value;
		emitChange();
	},
	setCitySearchResult(value) {
		citySearchResult = value;
		emitChange();
	},
	setCityCardData(value) {
		cityCardData = value;
		emitChange();
	},
	setTodayDetailsData(value) {
		todayDetailsData = value;
		emitChange();
	},
	setDayDetailData(value) {
		dayDetailData = value;
		emitChange();
	},
	setWeekData(value) {
		weekData = value;
		emitChange();
	},
	setLastCity(value) {
		lastCity = value;
		emitChange();
	},
	setDefaultCity(value) {
		defaultCity = value;
		emitChange();
	},
	setIsGeoActive(value) {
		isGeoActive = value;
		emitChange();
	},
};

export const useWeather = () => {
	const {
		subscribe,
		getValue,
		getError,
		getLoadingDetail,
		getLoadingWeek,
		getIsDropdownOpen,
		getHistory,
		getIsCitySearching,
		getCitySearchResult,
		getCityCardData,
		getTodayDetailsData,
		getDayDetailData,
		getWeekData,
		getLastCity,
		getDefaultCity,
		getIsGeoActive,
		setValue,
		setError,
		setLoadingDetail,
		setLoadingWeek,
		setIsDropdownOpen,
		setHistory,
		setIsCitySearching,
		setCitySearchResult,
		setCityCardData,
		setTodayDetailsData,
		setDayDetailData,
		setWeekData,
		setLastCity,
		setDefaultCity,
		setIsGeoActive,
	} = weatherStore;
	const value = useSyncExternalStore(subscribe, getValue);
	const error = useSyncExternalStore(subscribe, getError);
	const loadingDetail = useSyncExternalStore(subscribe, getLoadingDetail);
	const loadingWeek = useSyncExternalStore(subscribe, getLoadingWeek);
	const isDropdownOpen = useSyncExternalStore(subscribe, getIsDropdownOpen);
	const history = useSyncExternalStore(subscribe, getHistory);
	const isCitySearching = useSyncExternalStore(subscribe, getIsCitySearching);
	const citySearchResult = useSyncExternalStore(subscribe, getCitySearchResult);
	const cityCardData = useSyncExternalStore(subscribe, getCityCardData);
	const todayDetailsData = useSyncExternalStore(subscribe, getTodayDetailsData);
	const dayDetailData = useSyncExternalStore(subscribe, getDayDetailData);
	const weekData = useSyncExternalStore(subscribe, getWeekData);
	const lastCity = useSyncExternalStore(subscribe, getLastCity);
	const defaultCity = useSyncExternalStore(subscribe, getDefaultCity);
	const isGeoActive = useSyncExternalStore(subscribe, getIsGeoActive);

	const debounceValue = useDebounceValue(value);

	useEffect(() => {
		const storedCities =
			JSON.parse(localStorage.getItem('weatherAppSearchHistory')) || [];
		setHistory(storedCities);
	}, []);

	useEffect(() => {
		saveMapToLocalStorage(cacheCityData, STORAGE_KEYS.cacheCityData);
	}, [citySearchResult]);

	useEffect(() => {
		setStartData();
	}, []);

	const clearHistory = () => {
		setHistory([]);
		localStorage.removeItem('weatherAppSearchHistory');
	};

	const getCityData = async (city) => {
		if (!city) return;
		try {
			setIsCitySearching(true);
			const dataFromCache = cacheCityData.get(city);
			const responseCity = dataFromCache
				? dataFromCache
				: await ApiServices.getCityData(city);
			if (!dataFromCache) cacheCityData.set(city, responseCity);
			if (!responseCity.length) {
				setIsCitySearching(false);
				setError(`Упс... Город ${city} не найден.`);
				throw new Error('Отсутствует связь со сторонним сервисом');
			}
			setIsCitySearching(false);

			const existingCityIndex = history.findIndex(
				(item) => item.name === responseCity[0].name
			);
			let updatedHistory;
			if (existingCityIndex !== -1) {
				updatedHistory = [
					responseCity[0],
					...history.slice(0, existingCityIndex),
					...history.slice(existingCityIndex + 1),
				];
			} else {
				updatedHistory = [responseCity[0], ...history.slice(0, 5 - 1)];
			}
			setHistory(updatedHistory);
			localStorage.setItem(
				'weatherAppSearchHistory',
				JSON.stringify(updatedHistory)
			);

			setCitySearchResult(responseCity[0]);
			return responseCity[0];
		} catch (e) {
			setError(e.message);
			console.log(e.message);
		}
	};

	const getWeatherData = useCallback(
		async (city) => {
			setLoadingDetail(true);
			setLoadingWeek(true);
			try {
				const cityFromCache = cacheCityData.get(city);
				const cityData = cityFromCache
					? cityFromCache
					: await ApiServices.getCityData(city);
				if (!cityFromCache) cacheCityData.set(city, cityData);

				const { lat, lon } = cityData[0];
				const weatherFromCache = cacheWeatherData.get(city);
				const weatherData = weatherFromCache
					? weatherFromCache
					: await ApiServices.getWeatherData(lat, lon);

				if (!weatherFromCache) {
					cacheWeatherData.set(city, weatherData);
					saveMapToSessionStorage(
						cacheWeatherData,
						STORAGE_KEYS.cacheWeatherData
					);
				}
				//==============================================================
				//На этом участке режим частичных ошибок, закоментировать для нормальной работы
				// const random = Math.random();
				// if (random < 0.2) throw new Error('Shit is hapening sometime');
				//==============================================================
				const cityName = getCityName(cityData[0]);
				setCityCardData(formatCityCardData(weatherData, cityName));
				setTodayDetailsData(formatTodayDetailsData(weatherData));
				return weatherData;
			} catch (e) {
				setError(e.message);
				console.log(e.message);
			} finally {
				setLoadingDetail(false);
				setLoadingWeek(false);
			}
		},
		[
			setCityCardData,
			setError,
			setLoadingDetail,
			setLoadingWeek,
			setTodayDetailsData,
		]
	);

	const getWeekWeatherData = useCallback(
		async (lat, lon) => {
			try {
				setLoadingWeek(true);
				const keyForCache = `${lat},${lon}`;
				const dataFromCache = cacheWeatherWeekData.get(keyForCache);
				const data = dataFromCache
					? dataFromCache
					: await ApiServices.getWeekWeatherData(lat, lon);

				if (!dataFromCache) {
					cacheWeatherWeekData.set(keyForCache, data);
					saveMapToSessionStorage(
						cacheWeatherWeekData,
						STORAGE_KEYS.cacheWeatherWeekData
					);
				}

				setWeekData(
					formatWeekData(data.list, data.city.timezone).length > 5
						? formatWeekData(data.list, data.city.timezone).slice(1)
						: formatWeekData(data.list, data.city.timezone)
				);

				setDayDetailData(formatDayWeather(data.list, data.city.timezone));
			} catch (error) {
				setError(error.message);
				console.log(error.message);
			} finally {
				setLoadingWeek(false);
			}
		},
		[setDayDetailData, setError, setLoadingWeek, setWeekData]
	);

	const update = useCallback(
		(lat, lon, name) => {
			setError(null);
			setLastCity({ lat, lon, name });
			getWeatherData(name);
			getWeekWeatherData(lat, lon);
		},
		[getWeatherData, getWeekWeatherData, setError, setLastCity]
	);

	const updateWeatherData = () => {
		if (lastCity) {
			const { lat, lon, name } = lastCity;
			update(lat, lon, name);
		}
	};

	const setStartData = useCallback(() => {
		if (defaultCity) {
			const { lat, lon, name } = defaultCity;
			update(lat, lon, name);
		}
	}, [defaultCity, update]);

	const getWeather = useCallback(
		(lat, lon, name) => {
			setError(null);
			setLastCity({ lat, lon, name });
			getWeatherData(name);
			getWeekWeatherData(lat, lon);
			setIsDropdownOpen(false);
			setValue('');
			setCitySearchResult('');
		},
		[
			getWeatherData,
			getWeekWeatherData,
			setCitySearchResult,
			setError,
			setIsDropdownOpen,
			setLastCity,
			setValue,
		]
	);

	return {
		value,
		debounceValue,
		error,
		loadingDetail,
		setLoadingDetail,
		loadingWeek,
		isDropdownOpen,
		isCitySearching,
		history,
		citySearchResult,
		dayDetailData,
		weekData,
		setValue,
		setError,
		setCitySearchResult,
		setIsDropdownOpen,
		clearHistory,
		getCityData,
		getWeekWeatherData,
		cityCardData,
		todayDetailsData,
		getWeatherData,
		lastCity,
		setLastCity,
		updateWeatherData,
		defaultCity,
		setDefaultCity,
		isGeoActive,
		setIsGeoActive,
		STORAGE_KEYS,
		setStartData,
		getWeather,
	};
};
