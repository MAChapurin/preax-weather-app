import { Icon } from 'components';
import { useTheme, useWeather } from 'store';
import { cn } from 'utils';

import styles from './styles.module.css';

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
				aria-label={`Переключить на ${isDarkTheme ? 'светлую' : 'темную'} тему`}
				className={styles.checkbox}
				type='checkbox'
				checked={isDarkTheme}
				onChange={() => setIsDarkTheme(!isDarkTheme)}
			/>
			<Icon className={styles.day} name={'sun'} />
			<Icon className={styles.night} name={'moon'} />
		</label>
	);
}
