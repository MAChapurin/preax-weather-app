import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { Title } from 'components';
import { ApiServices } from 'api';

import { useWeather } from 'store';
import { loadMapFromSessionStorage, saveMapToSessionStorage } from 'utils';
import { STORAGE_KEYS } from 'constants';

import styles from './styles.module.css';

const getFormatString = (str1, str2) => {
	if (str1.toLowerCase().includes(str2)) {
		const left = str2[0].toUpperCase() + str2.slice(1);
		const right = str1.slice(str2.length);
		return (
			<>
				<span className={styles.selectedText}>{left}</span>
				<span>{right}</span>
			</>
		);
	}
	return str1;
};

export const LifeSearchList = () => {
	const [cities, setCities] = useState([]);
	const { debounceValue, getCityData } = useWeather();
	const value = debounceValue;

	const abortControllerRef = useRef(null);

	const cacheCitiesByQuery = useMemo(
		() => loadMapFromSessionStorage(STORAGE_KEYS.cacheCitiesByQuery),
		[]
	);

	const getCities = useCallback(
		async (query, signal) => {
			const dataFromCache = cacheCitiesByQuery.get(query);
			const citiesResult = dataFromCache
				? dataFromCache
				: await ApiServices.getCitiesByQuery(query, signal);
			if (!dataFromCache) {
				cacheCitiesByQuery.set(query, citiesResult);
				saveMapToSessionStorage(
					cacheCitiesByQuery,
					STORAGE_KEYS.cacheCitiesByQuery
				);
			}
			setCities(citiesResult);
		},
		[cacheCitiesByQuery]
	);

	const onClick = (e) => {
		const newValue = e.target?.closest('button').dataset?.city;
		if (newValue) {
			getCityData(newValue);
		}
	};

	useEffect(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		abortControllerRef.current = new AbortController();
		const signal = abortControllerRef.current.signal;
		getCities(value, signal);
	}, [getCities, value]);

	const isShowedRepeatValue =
		!cities.map((el) => el.toLowerCase()).includes(value.toLowerCase()) &&
		value.length >= 3;

	return (
		<div>
			<Title text={'Города по запросу'} />
			<ul className={styles.list} onClick={onClick}>
				{isShowedRepeatValue && (
					<li>
						<button
							aria-label={'Отправить запрос на поиск для ' + value}
							className={styles.btn}
							data-city={value}
						>
							{getFormatString(value, value)}
						</button>
					</li>
				)}
				{cities.map((city) => (
					<li key={city}>
						<button
							aria-label={'Отправить запрос на поиск для ' + city}
							className={styles.btn}
							data-city={city}
						>
							{getFormatString(city, value)}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
