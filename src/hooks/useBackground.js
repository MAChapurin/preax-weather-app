import { useTheme } from './useThemeContext';

import {
	bg_dark_1,
	bg_dark_2,
	bg_dark_3,
	bg_dark_4,
	bg_dark_5,
	bg_dark_6,
	bg_dark_7,
	bg_dark_8,
	bg_dark_9,
	bg_day_1,
	bg_day_2,
	bg_day_3,
	bg_day_4,
	bg_day_5,
	bg_day_6,
	bg_day_7,
	bg_day_8,
	bg_day_9,
} from 'assets/img/bg';

export function useBackground(weather) {
	const { isDarkTheme } = useTheme();
	switch (weather) {
		case 'ясно':
		case 'солнечно':
			return isDarkTheme ? bg_dark_1 : bg_day_1;
		case 'облачно с прояснениями':
		case 'небольшая облачность':
			return isDarkTheme ? bg_dark_2 : bg_day_2;
		case 'переменная облачность':
			return isDarkTheme ? bg_dark_3 : bg_day_3;
		case 'пасмурно':
		case 'облачно':
		case weather.includes('облачно') ? weather : '':
			return isDarkTheme ? bg_dark_4 : bg_day_4;
		case 'дождь':
		case 'небольшой дождь':
		case 'небольшой проливной дождь':
		case weather.includes('дождь') ? weather : '':
			return isDarkTheme ? bg_dark_5 : bg_day_5;
		case 'ливень':
			return isDarkTheme ? bg_dark_6 : bg_day_6;
		case 'гроза':
		case 'шторм':
		case 'ураган':
			return isDarkTheme ? bg_dark_7 : bg_day_7;
		case 'снег':
		case 'небольшой снег':
		case 'сильный снег':
		case weather.includes('снег') ? weather : '':
			return isDarkTheme ? bg_dark_8 : bg_day_8;
		case 'туман':
		case weather.includes('морось') ? weather : '':
			return isDarkTheme ? bg_dark_9 : bg_day_9;
		default:
			return isDarkTheme ? bg_dark_2 : bg_day_2;
	}
}
