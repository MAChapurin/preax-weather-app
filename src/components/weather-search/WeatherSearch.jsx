import { useEffect, useRef } from 'react';
import { useWeather } from 'store';
import { useClickOutside } from 'hooks';
import { Dropdown, Input } from 'components';

import styles from './styles.module.css';

export const WeatherSearch = () => {
	const weatherSearchRef = useRef(null);

	const {
		setValue,
		setError,
		isDropdownOpen,
		setIsDropdownOpen,
		setCitySearchResult,
	} = useWeather();

	const handleSearchClick = () => {
		!isDropdownOpen && setIsDropdownOpen(true);
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
			<Input />
			<Dropdown />
		</search>
	);
};
