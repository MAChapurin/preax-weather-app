import { useWeather } from 'hooks';
import { useEffect } from 'react';
import { CardList, CityCard, ErrorWidget, Skeleton, Tab } from 'components';

import styles from './styles.module.css';

export const Main = () => {
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
