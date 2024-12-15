import { weatherIconsPath } from '../data';
import { formatTime } from 'utils';

export const formatCityCardData = (data, cityName) => {
	const { date, time } = formatTime(
		Date.now(),
		(data?.timezone || 10800) * 1000
	);

	const template = {
		city: cityName || 'Кременчуг-Константиновское',
		date: date,
		time: time,
		temp: '-7°',
		img: {
			src: weatherIconsPath + '04d.svg',
			alt: 'Облачно',
		},
		description: 'Ощущается как -11°',
	};

	if (!data) return template;

	template.temp = Math.round(data.main.temp) + '°';
	template.img.src = data.weather[0].icon;
	template.img.alt = data.weather[0].description;
	template.description =
		'Ощущается как ' + Math.round(data.main.feels_like) + '°';

	return template;
};
