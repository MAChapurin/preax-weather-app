import humidity from '../assets/img/cards/humidity.svg';
import barometr from '../assets/img/cards/barometr.svg';
import visibility from '../assets/img/cards/visibility.svg';
import sunrise from '../assets/img/cards/sunrise.svg';
import sunset from '../assets/img/cards/sunset.svg';
import direction from '../assets/img/cards/direction.svg';
import { directions } from '../constants';
import { formatTime } from 'utils';

export const formatTodayDetailsData = (data) => {
	const template = [
		{
			code: 'humidity',
			name: 'Влажность',
			img: humidity,
			value: 75,
			units: '%',
			progress: {
				view: 'scale',
				type: 'normal',
				min: 0,
				max: 100,
			},
		},
		{
			code: 'barometr',
			name: 'Давление',
			img: barometr,
			value: 761,
			progress: {
				type: 'high',
				min: 700,
				max: 800,
			},
			description: 'Повышенное',
		},
		{
			code: 'visibility',
			name: 'Видимость',
			img: visibility,
			value: 10,
			units: 'км',
			progress: {
				type: 'normal',
				min: 0,
				max: 10,
			},
			description: 'Нормальная',
		},
		{
			code: 'sunrise',
			name: 'Рассвет',
			img: sunrise,
			value: '8:42',
			description: 'Прошло: 02:47',
		},
		{
			code: 'sunset',
			name: 'Закат',
			img: sunset,
			value: '16:37',
			description: 'Осталось: 05:08',
		},
		{
			code: 'direction',
			name: 'Сила ветра',
			img: direction,
			value: 2,
			units: 'м/с',
			windAngle: 315,
			description: 'Северо-западный',
		},
	];

	if (!data) return template;

	template.map((item) => {
		switch (item.code) {
			case 'humidity':
				item.value = data.main.humidity;
				break;
			case 'barometr':
				item.value = Math.round(data.main.pressure * 0.750064);
				if (item.value < 740) {
					item.description = 'Пониженное';
				} else if (item.value > 760) {
					item.description = 'Повышенное';
				} else {
					item.description = 'Нормальное';
				}
				break;
			case 'visibility':
				item.value = data.visibility ? Math.round(data.visibility / 1000) : 10;
				break;
			case 'sunrise':
				const sunriseStats = formatTime(
					data.sys.sunrise * 1000,
					data.timezone * 1000
				);
				item.value = sunriseStats.time;
				item.description = sunriseStats.diffDescription;
				break;
			case 'sunset':
				const sunsetStats = formatTime(
					data.sys.sunset * 1000,
					data.timezone * 1000
				);
				item.value = sunsetStats.time;
				item.description = sunsetStats.diffDescription;
				break;
			case 'direction':
				item.value = Math.round(data.wind.speed);
				item.windAngle = data.wind.deg % 360;
				// item.windAngle = item.windAngle > 360 ? item.windAngle - 360 : item.windAngle;
				const windDirectionIndex = Math.round(item.windAngle / 45);
				item.description =
					directions[
						windDirectionIndex >= directions.length ? 0 : windDirectionIndex
					];
				break;

			default:
				break;
		}

		return item;
	});

	return template;
};
