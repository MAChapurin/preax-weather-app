import { useState } from 'react';
import { useWeather } from 'store';
import { Slider, TabBar, ErrorWidget } from 'components';
import { statisticWeekData, statisticDayData } from '../../data';

import styles from './styles.module.css';

export const Tab = () => {
	const { dayDetailData, weekData, error, updateWeatherData, loadingWeek } =
		useWeather();
	const [tab, setTab] = useState(1);

	return (
		<section className={styles['statistic']}>
			<TabBar setTab={setTab} tab={tab} />
			{!error && (
				<>
					<Slider
						vissible={tab === 1 ? true : false}
						data={dayDetailData ?? statisticDayData}
						loading={loadingWeek}
					/>
					<Slider
						vissible={tab === 2 ? true : false}
						data={weekData ?? statisticWeekData}
						loading={loadingWeek}
					/>
				</>
			)}
			{error && (
				<div className={styles.error}>
					<ErrorWidget
						title={false}
						desc={false}
						variant={'small'}
						cb={updateWeatherData}
					/>
				</div>
			)}
		</section>
	);
};
