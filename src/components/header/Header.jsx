import WeatherSearch from '../weather-search/WeatherSearch';
import Logo from '../logo/Logo';
import styles from './styles.module.css';
import { Switch } from '../switch/Switch';
import { useWeather } from '../../hooks/useWeatherContext';
import { cn } from '../../utils/cn';

const Header = () => {
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

export default Header;
