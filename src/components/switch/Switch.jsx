import { Icon } from '../icon/Icon';
import { useTheme, useWeather } from 'hooks';
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
