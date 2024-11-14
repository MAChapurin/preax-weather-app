import { useEffect, useState } from 'react';
import { Icon } from '../icon/Icon';

import styles from './styles.module.css';
import { Skeleton } from '../skeleton/Skeleton';
import { ApiServices } from '../../api/api.services';
import { ErrorWidget } from '../error-widget/ErrorWidget';
import formatTime from '../../utils/formatTime';
import { cn } from '../../utils/cn';
import { useBackground } from '../../hooks/useBackground';

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

	const getData = async () => {
		if (!lat || !lon) {
			console.log('no coords');
			return false;
		}
		setLoading(true);
		setError(null);
		try {
			const { temp, description, timezone } =
				await ApiServices.getWeatherMiniData(lat, lon);
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
	};

	const updateDate = () => {
		setDate(Date.now);
	};

	useEffect(() => {
		getData();
	}, [lat, lon]);
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
