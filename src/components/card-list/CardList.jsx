import { Card, Skeleton } from 'components';

import styles from './styles.module.css';

export const CardList = ({ data, loading }) => {
	return (
		<ul className={`list-reset ${styles.cards}`}>
			{!loading && data.map((item) => <Card key={item.code} item={item} />)}
			{loading &&
				Array.from({ length: 6 }).map((_, i) => {
					return <Skeleton variant={'card'} key={i} />;
				})}
		</ul>
	);
};
