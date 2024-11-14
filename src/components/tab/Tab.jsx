import { useState } from 'react';
import { useWeather } from 'hooks';
import { Slider, TabBar, ErrorWidget } from 'components';
import { statisticWeekData, statisticDayData } from '../../data';

import styles from './styles.module.css';

export const Tab = ({ loading }) => {
	const { dayDetailData, weekData, error, updateWeatherData } = useWeather();
	const [tab, setTab] = useState(1);

	return (
		<section className={styles['statistic']}>
			<TabBar setTab={setTab} tab={tab} />
			{!error && (
				<>
					<Slider
						vissible={tab === 1 ? true : false}
						data={dayDetailData ?? statisticDayData}
						loading={loading}
					/>
					<Slider
						vissible={tab === 2 ? true : false}
						data={weekData ?? statisticWeekData}
						loading={loading}
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
