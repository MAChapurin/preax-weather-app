import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useBackground } from 'hooks';
import { ErrorWidget, Icon, Skeleton } from 'components';
import {
	cn,
	formatTime,
	loadMapFromSessionStorage,
	saveMapToSessionStorage,
} from 'utils';

import { ApiServices } from 'api';
import { STORAGE_KEYS } from 'constants';

import styles from './styles.module.css';

export const WeatherCard = ({
	As = 'li',
	name,
	className,
	disabled,
	mainCallBack,
	supportCallBack,
	isChecked,
	lat,
	lon,
	isWithoutSupport = false,
}) => {
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [temp, setTemp] = useState('');
	const [status, setStatus] = useState('');
	const [timezone, setTimezone] = useState(10800);
	const [date, setDate] = useState(Date.now());

	const backgroundImage = useBackground(status);

	const checkedStyles = isChecked ? styles.checked : '';
	const { time } = formatTime(date, timezone * 1000);

	const abortControllerRef = useRef(null);

	const cacheWeatherDataMini = useMemo(
		() => loadMapFromSessionStorage(STORAGE_KEYS.cacheWeatherDataMini),
		[]
	);

	const getData = useCallback(
		async (signal) => {
			if (!lat || !lon) {
				console.log('no coords');
				return false;
			}
			setLoading(true);
			setError(null);
			try {
				const dataFromCache = cacheWeatherDataMini.get(`${lat}+${lon}`);
				const { temp, description, timezone } = dataFromCache
					? dataFromCache
					: await ApiServices.getWeatherMiniData(lat, lon, signal);

				if (!dataFromCache) {
					cacheWeatherDataMini.set(`${lat}+${lon}`, {
						temp,
						description,
						timezone,
					});
					saveMapToSessionStorage(
						cacheWeatherDataMini,
						STORAGE_KEYS.cacheWeatherDataMini
					);
				}
				//==============================================================
				//На этом участке режим частичных ошибок, закоментировать для нормальной работы
				// const random = Math.random();
				// if (random < 0.2) throw new Error('Shit is hapening sometime');
				//==============================================================
				setTemp(temp);
				setStatus(description);
				setTimezone(timezone);
			} catch (e) {
				console.log('from weatherCard =>', e.message);
				setError(e?.message);
			} finally {
				setLoading(false);
			}
		},
		[lat, lon]
	);

	const updateDate = () => {
		setDate(Date.now);
	};

	useEffect(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		abortControllerRef.current = new AbortController();
		const signal = abortControllerRef.current.signal;
		getData(signal);

		return () => {
			abortControllerRef.current.abort();
		};
	}, [getData]);

	useEffect(() => {
		const id = setInterval(updateDate, 30000);
		return () => {
			clearInterval(id);
		};
	}, [timezone]);

	return (
		<>
			{isLoading && <Skeleton variant={'weather'} />}
			{!isLoading && !error && (
				<As
					className={cn(styles.card, className)}
					style={{
						backgroundImage: `url("${backgroundImage}")`,
					}}
				>
					<button
						aria-label={'Загрузка прогноза погода для ' + name}
						className={`btn-reset ${styles.mainBtn}`}
						onClick={mainCallBack}
					>
						<div className={styles.left}>
							<h3 className={styles.city}>{name}</h3>
							<time className={styles.time}>{time}</time>
						</div>
						<div className={styles.right}>
							<p className={styles.degree}>{temp}</p>
							<p className={styles.status}>{status}</p>
						</div>
					</button>
					{!isWithoutSupport && (
						<button
							aria-label={
								isChecked ? 'Убрать из избранного' : 'Добавить в избранное'
							}
							className={`btn-reset ${styles.supportBtn} ${checkedStyles}`}
							onClick={supportCallBack}
							disabled={disabled}
						>
							<Icon className={styles.icon} name='like' />
						</button>
					)}
				</As>
			)}
			{error && <ErrorWidget variant='min' bgLight cb={getData} />}
		</>
	);
};
