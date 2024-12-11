import { useRef } from 'react';
import { Icon } from 'components';
import { useWeather } from 'store';
import { cn } from 'utils';

import styles from './styles.module.css';

export const Input = () => {
	const {
		isDropdownOpen,
		setIsGeoActive,
		value,
		setValue,
		setCitySearchResult,
		setIsDropdownOpen,
		getCityData,
		setError,
	} = useWeather();

	const inputRef = useRef(null);

	const onGeo = () => {
		setIsGeoActive(true);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (value) getCityData(value);
	};

	const onClick = () => {
		setIsDropdownOpen(true);
	};

	const onFocus = (e) => {
		e.preventDefault();
		setIsGeoActive(false);
		onClick();
	};

	const onClear = () => {
		setValue('');
		setCitySearchResult('');
	};

	const onChange = (e) => {
		setError(null);
		setCitySearchResult('');
		const newValue = e.target.value;
		if (!/[A-Za-z]/g.test(newValue)) {
			setValue(newValue);
		}
	};
	return (
		<form
			className={cn(styles.form, {
				[styles.openDropdown]: isDropdownOpen,
			})}
			onSubmit={onSubmit}
		>
			<input
				ref={inputRef}
				onFocus={onFocus}
				type='text'
				className={styles.input}
				name='city'
				value={value}
				onChange={onChange}
				placeholder='Поиск по городу'
				autoComplete='off'
				onClick={onClick}
			/>
			<button
				className={cn(styles.button, {
					[styles.pointer]: value,
				})}
				onClick={onClear}
				type='button'
			>
				<Icon name={value ? 'clear' : 'search'} />
			</button>
			<button
				onFocus={onGeo}
				onClick={onGeo}
				type='button'
				className={cn(styles.buttonGeo)}
			>
				<Icon name='geolocation' />
			</button>
		</form>
	);
};
