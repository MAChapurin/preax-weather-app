import { Icon } from '../icon/Icon';

import styles from './styles.module.css';
import { cn } from '../../utils/cn';
import { useWeather } from '../../hooks/useWeatherContext';
import { useTheme } from '../../hooks/useThemeContext';

export function Switch() {
	const { isDropdownOpen } = useWeather();
	const { isDarkTheme, setIsDarkTheme } = useTheme();

	return (
		<label
			className={cn(styles.switch, {
				[styles.closed]: isDropdownOpen,
			})}
		>
			<input
				className={styles.checkbox}
				type='checkbox'
				checked={isDarkTheme}
				onChange={() => setIsDarkTheme((prev) => !prev)}
			/>
			<Icon className={styles.day} name={'sun'} />
			<Icon className={styles.night} name={'moon'} />
		</label>
	);
}
