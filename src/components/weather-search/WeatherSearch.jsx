import { useEffect, useRef, useState } from 'react';
import { useDebounceValue, useClickOutside, useWeather } from 'hooks';
import { Dropdown, Input } from 'components';

import styles from './styles.module.css';

export const WeatherSearch = () => {
	const weatherSearchRef = useRef(null);

	const [value, setValue] = useState('');
	const {
		setError,
		isCitySearching,
		getCityData,
		isDropdownOpen,
		setIsDropdownOpen,
		citySearchResult,
		setCitySearchResult,
		getWeekWeatherData,
		getWeatherData2,
		setLastCity,
	} = useWeather();

	const debounceValue = useDebounceValue(value);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (value) getCityData(value);
	};

	const handleClick = () => {
		setIsDropdownOpen(true);
	};

	const handleChange = (e) => {
		setError(null);
		setCitySearchResult('');
		const newValue = e.target.value;
		if (!/[A-Za-z]/g.test(newValue)) {
			setValue(newValue);
		}
	};

	const handleSearchClick = () => {
		!isDropdownOpen && setIsDropdownOpen(true);
	};

	// =======================
	const handleGetWeatherByName = (lat, lon, name) => {
		setError(null);
		setLastCity({ lat, lon, name });
		getWeatherData2(name);
		getWeekWeatherData(lat, lon);
		setIsDropdownOpen(false);
		setValue('');
		setCitySearchResult('');
	};
	// ============================
	const handleGetCity = (name) => {
		setError('');
		getCityData(name);
		setValue(name);
		setCitySearchResult('');
	};

	const handleClear = () => {
		setValue('');
		setCitySearchResult('');
	};

	useClickOutside(
		weatherSearchRef,
		() => {
			setError('');
			setIsDropdownOpen(false);
			setCitySearchResult('');
			setValue('');
		},
		isDropdownOpen
	);

	useEffect(() => {
		if (isDropdownOpen) {
			setError('');
		}
	}, [isDropdownOpen]);

	return (
		<search
			className={styles.wrapper}
			onClick={handleSearchClick}
			ref={weatherSearchRef}
		>
			<Input
				value={value}
				isDropdownOpen={isDropdownOpen}
				handleClear={handleClear}
				handleClick={handleClick}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
			/>

			{isDropdownOpen && (
				<Dropdown
					value={debounceValue}
					setValue={setValue}
					isCitySearching={isCitySearching}
					citySearchResult={citySearchResult}
					getCity={handleGetCity}
					getWeather={handleGetWeatherByName}
				/>
			)}
		</search>
	);
};
