import { CardList, CityCard, ErrorWidget, Tab } from 'components';
import { useWeather } from 'store';

import styles from './styles.module.css';

export const Main = () => {
	const { error, updateWeatherData } = useWeather();
	return (
		<main>
			{error ? (
				<ErrorWidget variant={'big'} cb={updateWeatherData} />
			) : (
				<div className={styles.main}>
					<CityCard />
					<CardList />
				</div>
			)}
			<Tab />
		</main>
	);
};
