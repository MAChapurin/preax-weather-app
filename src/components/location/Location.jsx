import { useEffect, useRef, useState } from 'react';

import { Skeleton } from '..';
import { WeatherCard } from '../weather-card/weatherCard';
import { ApiServices } from '../../api/api.services';

import styles from './styles.module.css';
import { useWeather } from '../../hooks/useWeatherContext';

const TEXT = {
	loading: 'Определяем геопозицию',
	question: 'Вы находитесь в этом городе?',
	errorTitle: 'Местоположение не определено',
	errorMessage1: 'К сожалению, не удалось определить вашу геопозицию.',
	errorMessage2: 'Воспользуйтесь поиском или попробуйте еще раз позднее.',
};

const Loader = () => (
	<>
		<h3 className={styles.title}>{TEXT.loading}</h3>
		<Skeleton variant={'weather'} />
	</>
);

const ErrorResult = () => (
	<>
		<h3 className={styles.title}>{TEXT.errorTitle}</h3>
		<p className={styles.desc}>{TEXT.errorMessage1}</p>
		<p className={styles.desc}>{TEXT.errorMessage1}</p>
	</>
);

export const Location = ({ getWeather }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [coords, setCoords] = useState({});
	const [city, setCity] = useState('');
	const [isFailed, setIsFailed] = useState(false);

	const { setIsGeoActive, setDefaultCity, STORAGE_KEYS } = useWeather();

	const isSuccess = city.length > 0 && !isFailed && !isLoading;

	const { lat, lon } = coords;

	const btnConfirmRef = useRef(null);

	const onError = (error) => {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				console.log('User denied the request for Geolocation.');
				setIsFailed(true);
				break;
			case error.POSITION_UNAVAILABLE:
				console.log('Location information is unavailable.');
				setIsFailed(true);
				break;
			case error.TIMEOUT:
				console.log('The request to get user location timed out.');
				setIsFailed(true);
				break;
			case error.UNKNOWN_ERROR:
				console.log('An unknown error occurred.');
				setIsFailed(true);
				break;
			default:
				console.log('Error because I can');
				setIsFailed(true);
		}
		setIsLoading(false);
	};

	const onSuccess = async (position) => {
		try {
			const coordinates = position?.coords;
			if (coordinates) {
				const { latitude, longitude } = coordinates;
				setCoords({ lat: latitude, lon: longitude });
				const weatherData = await ApiServices.getWeatherData(
					latitude,
					longitude
				);
				const cityName = weatherData?.name;
				setCity(cityName ? cityName : '');
				if (!cityName) {
					throw Error('Failed to get name');
				}
			}
		} catch (error) {
			console.log(error.message);
			setIsFailed(true);
		} finally {
			setIsLoading(false);
		}
	};

	const onClose = () => {
		setIsGeoActive(false);
	};

	const onConfirm = () => {
		getWeather(lat, lon, city);
		setIsGeoActive(false);
		setDefaultCity({ lat, lon, city });
		localStorage.setItem(
			STORAGE_KEYS.defaultCity,
			JSON.stringify({ lat, lon, name: city })
		);
	};

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		} else {
			setIsFailed(true);
		}
	}, []);

	useEffect(() => {
		btnConfirmRef.current?.focus();
	}, [isSuccess]);

	return (
		<div className={styles.root}>
			{isLoading && <Loader />}
			{isFailed && <ErrorResult />}
			{isSuccess && (
				<>
					<h3 className={styles.title}>{TEXT.question}</h3>
					<WeatherCard
						name={city}
						mainCallBack={onConfirm}
						lat={lat}
						lon={lon}
						isWithoutSupport
					/>
					<div className={styles.btnWrap}>
						<button onClick={onClose} className={styles.btn}>
							Нет
						</button>
						<button
							ref={btnConfirmRef}
							className={styles.btn}
							onClick={onConfirm}
						>
							Да
						</button>
					</div>
				</>
			)}
		</div>
	);
};
