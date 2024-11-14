import { useState, useEffect } from 'react';
import WeatherContext from './weatherContext';
import { cityCardMock, weatherMock } from '../data';

import { ApiServices } from '../api/api.services';
import {
	formatCityCardData,
	formatDayWeather,
	formatTodayDetailsData,
	formatWeekData,
	getCityName,
} from 'utils';

const STORAGE_KEYS = {
	defaultCity: 'defaultCityKey',
};

const moscow = {
	lat: '55.625578',
	lon: '37.6063916',
	name: 'Москва',
};

export const WeatherProvider = ({ children, ...props }) => {
	const defaultCityData = localStorage.getItem(STORAGE_KEYS.defaultCity);
	const initialDefaultCityState = defaultCityData
		? JSON.parse(defaultCityData)
		: moscow;

	const [error, setError] = useState(null);
	const [loadingDetail, setLoadingDetail] = useState(false);
	const [loadingWeek, setLoadingWeek] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [history, setHistory] = useState([]);
	const [isCitySearching, setIsCitySearching] = useState(false);
	const [citySearchResult, setCitySearchResult] = useState(null);
	const [cityCardData, setCityCardData] = useState(cityCardMock);
	const [todayDetailsData, setTodayDetailsData] = useState(weatherMock);
	const [dayDetailData, setDayDetailData] = useState(null);
	const [weekData, setWeekData] = useState(null);
	const [lastCity, setLastCity] = useState(null);
	const [defaultCity, setDefaultCity] = useState(initialDefaultCityState);
	const [isGeoActive, setIsGeoActive] = useState(false);

	const clearHistory = () => {
		setHistory([]);
		localStorage.removeItem('weatherAppSearchHistory');
	};

	useEffect(() => {
		const storedCities =
			JSON.parse(localStorage.getItem('weatherAppSearchHistory')) || [];
		setHistory(storedCities);
	}, []);

	const getCityData = async (city) => {
		if (!city) return;
		try {
			setIsCitySearching(true);
			const responseCity = await ApiServices.getCityData(city);
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

	const getWeatherData2 = async (city) => {
		setLoadingDetail(true);
		setLoadingWeek(true);
		try {
			const cityData = await ApiServices.getCityData(city);
			const { lat, lon } = cityData[0];
			const weatherData = await ApiServices.getWeatherData(lat, lon);
			// console.log('weatherData2 =>', weatherData);
			//==============================================================
			//На этом участке режим частичных ошибок, закоментировать для нормальной работы
			const random = Math.random();
			if (random < 0.2) throw new Error('Shit is hapening sometime');
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
	};

	const getWeekWeatherData = async (lat, lon) => {
		try {
			setLoadingWeek(true);
			const data = await ApiServices.getWeekWeatherData(lat, lon);

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
	};

	const update = (lat, lon, name) => {
		setError(null);
		setLastCity({ lat, lon, name });
		getWeatherData2(name);
		getWeekWeatherData(lat, lon);
	};

	const updateWeatherData = () => {
		if (lastCity) {
			const { lat, lon, name } = lastCity;
			update(lat, lon, name);
		}
	};

	const setStartData = () => {
		if (defaultCity) {
			const { lat, lon, name } = defaultCity;
			update(lat, lon, name);
		}
	};

	return (
		<WeatherContext.Provider
			value={{
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
				setError,
				setCitySearchResult,
				setIsDropdownOpen,
				clearHistory,
				getCityData,
				getWeekWeatherData,
				cityCardData,
				todayDetailsData,
				getWeatherData2,
				lastCity,
				setLastCity,
				updateWeatherData,
				defaultCity,
				setDefaultCity,
				isGeoActive,
				setIsGeoActive,
				STORAGE_KEYS,
				setStartData,
			}}
			{...props}
		>
			{children}
		</WeatherContext.Provider>
	);
};
