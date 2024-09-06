import { useTheme } from './useThemeContext';

export function useBackground(weather) {
	const { isDarkTheme } = useTheme();
	switch (weather) {
		case 'ясно':
		case 'солнечно':
			return isDarkTheme ? 'bg-dark-1.jpg' : 'bg-day-1.jpg';
		case 'облачно с прояснениями':
		case 'небольшая облачность':
			return isDarkTheme ? 'bg-dark-2.jpg' : 'bg-day-2.jpg';
		case 'переменная облачность':
			return isDarkTheme ? 'bg-dark-3.jpg' : 'bg-day-3.jpg';
		case 'пасмурно':
		case 'облачно':
			return isDarkTheme ? 'bg-dark-4.jpg' : 'bg-day-4.jpg';
		case 'дождь':
		case 'небольшой дождь':
			return isDarkTheme ? 'bg-dark-5.jpg' : 'bg-day-5.jpg';
		case 'ливень':
			return isDarkTheme ? 'bg-dark-6.jpg' : 'bg-day-6.jpg';
		case 'гроза':
		case 'шторм':
			return isDarkTheme ? 'bg-dark-7.jpg' : 'bg-day-7.jpg';
		case 'снег':
			return isDarkTheme ? 'bg-dark-8.jpg' : 'bg-day-8.jpg';
		case 'туман':
			return isDarkTheme ? 'bg-dark-9.jpg' : 'bg-day-9.jpg';
		default:
			return '';
	}
}
