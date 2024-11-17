import { useEffect, useSyncExternalStore } from 'react';
import { cityCardMock, weatherMock } from '../data';

import { ApiServices } from 'api';
import {
    formatCityCardData,
    formatDayWeather,
    formatTodayDetailsData,
    formatWeekData,
    getCityName,
} from 'utils';

const subscribers = new Set();

const emitChange = () => {
    subscribers.forEach((callback) => {
        callback();
    });
};

const STORAGE_KEYS = {
    defaultCity: 'defaultCityKey',
};

const moscow = {
    lat: '55.625578',
    lon: '37.6063916',
    name: 'Москва',
};

const defaultCityData = localStorage.getItem(STORAGE_KEYS.defaultCity);
const initialDefaultCityState = defaultCityData
    ? JSON.parse(defaultCityData)
    : moscow;

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
let isGeoActive = false

const weatherStore = {
    subscribe(callback) {
        subscribers.add(callback);
        return () => subscribers.delete(callback);
    },
    //state====================================
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
    setError(value) {
        error = value
        emitChange()
    },
    setLoadingDetail(value) {
        loadingDetail = value
        emitChange()
    },
    setLoadingWeek(value) {
        loadingWeek = value
        emitChange()
    },
    setIsDropdownOpen(value) {
        isDropdownOpen = value
        emitChange()
    },
    setHistory(value) {
        history = value
        emitChange()
    },
    setIsCitySearching(value) {
        isCitySearching = value
        emitChange()
    },
    setCitySearchResult(value) {
        citySearchResult = value
        emitChange()
    },
    setCityCardData(value) {
        cityCardData = value
        emitChange()
    },
    setTodayDetailsData(value) {
        todayDetailsData = value
        emitChange()
    },
    setDayDetailData(value) {
        dayDetailData = value
        emitChange()
    },
    setWeekData(value) {
        weekData = value
        emitChange()
    },
    setLastCity(value) {
        lastCity = value
        emitChange()
    },
    setDefaultCity(value) {
        defaultCity = value
        emitChange()
    },
    setIsGeoActive(value) {
        isGeoActive = value
        emitChange()
    }

}

export const useWeather = () => {
    const {
        subscribe,
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
        setIsGeoActive

    } = weatherStore
    const error = useSyncExternalStore(subscribe, getError)
    const loadingDetail = useSyncExternalStore(subscribe, getLoadingDetail)
    const loadingWeek = useSyncExternalStore(subscribe, getLoadingWeek)
    const isDropdownOpen = useSyncExternalStore(subscribe, getIsDropdownOpen)
    const history = useSyncExternalStore(subscribe, getHistory)
    const isCitySearching = useSyncExternalStore(subscribe, getIsCitySearching)
    const citySearchResult = useSyncExternalStore(subscribe, getCitySearchResult)
    const cityCardData = useSyncExternalStore(subscribe, getCityCardData)
    const todayDetailsData = useSyncExternalStore(subscribe, getTodayDetailsData)
    const dayDetailData = useSyncExternalStore(subscribe, getDayDetailData)
    const weekData = useSyncExternalStore(subscribe, getWeekData)
    const lastCity = useSyncExternalStore(subscribe, getLastCity)
    const defaultCity = useSyncExternalStore(subscribe, getDefaultCity)
    const isGeoActive = useSyncExternalStore(subscribe, getIsGeoActive)

    useEffect(() => {
        const storedCities =
            JSON.parse(localStorage.getItem('weatherAppSearchHistory')) || [];
        setHistory(storedCities);
    }, []);

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('weatherAppSearchHistory');
    };

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

    return {
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
    }
}

