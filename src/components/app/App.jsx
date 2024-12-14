import { useWeather } from 'store';
import { useBackground } from 'hooks';
import { Footer, Header, Main } from 'components';
import { cn } from 'utils';

import styles from './styles.module.css';

export function App() {
	const { isDropdownOpen, cityCardData } = useWeather();
	const backgroundImage = useBackground(cityCardData.img?.alt);

	return (
		<div
			className={styles.app}
			style={{
				backgroundImage: `url("${backgroundImage}")`,
			}}
		>
			<div
				className={cn(styles.app__container, {
					[styles.blur]: !isDropdownOpen,
				})}
			>
				<Header />
				<Main />
				<Footer />
				<div
					className={cn(styles.blur__container, {
						[styles.open]: isDropdownOpen,
					})}
				></div>
			</div>
		</div>
	);
}
