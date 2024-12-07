import { useEffect, useState } from 'react';
import { Title } from 'components';
import { ApiServices } from 'api';

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

export const LifeSearchList = ({ value, setValue }) => {
	const [cities, setCities] = useState([]);

	const nodeCityInput = document.querySelector('input[name="city"]');

	const keyCashForSessionStorage = 'CitiesByQuery';
	const cache = new Map();
	// JSON.parse(sessionStorage.getItem(keyCashForSessionStorage))

	const getCities = async (query) => {
		const dataFromCache = cache.get(query);
		const citiesResult = dataFromCache
			? dataFromCache
			: await ApiServices.getCitiesByQuery(query);
		if (!dataFromCache) cache.set(query, citiesResult);
		setCities(citiesResult);
	};

	const onClick = (e) => {
		const newValue = e.target?.closest('button').dataset?.city;
		if (newValue) {
			console.log(newValue);
			setValue(newValue);
			nodeCityInput?.focus();
		}
	};

	useEffect(() => {
		getCities(value);
	}, [value]);

	useEffect(() => {
		sessionStorage.setItem(keyCashForSessionStorage, JSON.stringify(cache));
	}, [cache.length]);

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
