import styles from './styles.module.css';
import { Icon } from '../icon/Icon';
import { cn } from '../../utils/cn';
import { useWeather } from '../../hooks/useWeatherContext';

const Input = ({
	handleChange,
	handleClick,
	handleSubmit,
	value,
	handleClear,
}) => {
	const { isDropdownOpen, setIsGeoActive } = useWeather();
	const handleGeo = () => {
		setIsGeoActive(true);
	};
	return (
		<form
			className={cn(styles.form, {
				[styles.openDropdown]: isDropdownOpen,
			})}
			onSubmit={handleSubmit}
		>
			<input
				onFocus={handleClick}
				type='text'
				className={styles.input}
				name='city'
				value={value}
				onChange={handleChange}
				placeholder='Поиск по городу'
				autoComplete='off'
				onClick={handleClick}
			/>
			<button
				className={cn(styles.button, {
					[styles.pointer]: value,
				})}
				onClick={handleClear}
				type='button'
			>
				<Icon name={value ? 'clear' : 'search'} />
			</button>
			<button
				onFocus={handleGeo}
				onClick={handleGeo}
				type='button'
				className={cn(styles.buttonGeo)}
			>
				<Icon name='geolocation' />
			</button>
		</form>
	);
};

export default Input;
