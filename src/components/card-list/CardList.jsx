import { Card, Skeleton } from 'components';

import styles from './styles.module.css';
import { useWeather } from 'store';

export const CardList = () => {
	const { todayDetailsData, loadingDetail } = useWeather();
	return (
		<ul className={`list-reset ${styles.cards}`}>
			{!loadingDetail &&
				todayDetailsData.map((item) => <Card key={item.code} item={item} />)}
			{loadingDetail &&
				Array.from({ length: 6 }).map((_, i) => {
					return <Skeleton variant={'card'} key={i} />;
				})}
		</ul>
	);
};
