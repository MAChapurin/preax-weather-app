import { useWeather } from 'store';
import { Logo, Switch, WeatherSearch } from 'components';
import { cn } from 'utils';

import styles from './styles.module.css';

export const Header = () => {
	const { isDropdownOpen } = useWeather();
	return (
		<header
			className={cn(styles.header, {
				[styles.open]: isDropdownOpen,
			})}
		>
			<Logo />
			<div className={styles.right}>
				<WeatherSearch />
				<Switch />
			</div>
		</header>
	);
};
