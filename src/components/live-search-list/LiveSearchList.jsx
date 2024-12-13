import { useCallback, useEffect, useMemo, useState } from 'react';
import { Title } from 'components';
import { ApiServices } from 'api';

import styles from './styles.module.css';
import { useWeather } from 'store';
import { useRef } from 'react';
import { loadMapFromSessionStorage, saveMapToSessionStorage } from 'utils';

const keyCashForSessionStorage = 'CitiesByQuery';

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
	const { debounceValue, setValue } = useWeather();
	const nodeCityInput = document.querySelector('input[name="city"]');
	const value = debounceValue;

	const abortControllerRef = useRef(null);

	const cache = useMemo(
		() => loadMapFromSessionStorage(keyCashForSessionStorage),
		[]
	);

	const getCities = useCallback(
		async (query, signal) => {
			const dataFromCache = cache.get(query);
			const citiesResult = dataFromCache
				? dataFromCache
				: await ApiServices.getCitiesByQuery(query, signal);
			if (!dataFromCache) {
				cache.set(query, citiesResult);
				saveMapToSessionStorage(cache, keyCashForSessionStorage);
			}
			setCities(citiesResult);
		},
		[cache]
	);

	const onClick = (e) => {
		const newValue = e.target?.closest('button').dataset?.city;
		if (newValue) {
			console.log(newValue);
			setValue(newValue);
			nodeCityInput?.focus();
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

	return (
		<div>
			<Title text={'Города по запросу'} />
			<ul className={styles.list} onClick={onClick}>
				{cities.map((city) => (
					<li key={city}>
						<button className={styles.btn} data-city={city}>
							{getFormatString(city, value)}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
