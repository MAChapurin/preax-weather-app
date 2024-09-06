import { useWeather } from '../../hooks/useWeatherContext';
import CardList from '../card-list';
import CityCard from '../city-card';
import Tab from '../tab';
import styles from './styles.module.css';
import { Skeleton } from '../skeleton/Skeleton';
import { ErrorWidget } from '../error-widget/ErrorWidget';
import { useEffect } from 'react';

const Main = () => {
	const {
		cityCardData,
		todayDetailsData,
		loadingDetail,
		loadingWeek,
		error,
		updateWeatherData,
		setStartData,
	} = useWeather();
	useEffect(() => {
		setStartData();
	}, []);
	return (
		<main>
			{error && <ErrorWidget variant={'big'} cb={updateWeatherData} />}
			{!error && (
				<div className={styles.main}>
					{loadingDetail ? (
						<Skeleton variant={'detail'} />
					) : (
						<CityCard data={cityCardData} />
					)}
					<CardList data={todayDetailsData} loading={loadingDetail} />
				</div>
			)}
			<Tab loading={loadingWeek} />
		</main>
	);
};

export default Main;
