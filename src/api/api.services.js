export class ApiServices {
	// ===========================================================================================
	static async getCitiesByQuery(query) {
		try {
			const request = await fetch(
				`https://nominatim.openstreetmap.org/search.php?q=${query}&format=json&addressdetails=0&&limit=20&lang=ru`
			);
			const data = await request.json();
			return Array.from(new Set(data.filter(Boolean).map((el) => el.name)));
		} catch (e) {
			console.log('failed to search city ', query);
			return [];
		}
	}
	// ===========================================================================================
	static async getWeatherMiniData(lat, lon) {
		try {
			const request = await fetch(
				`https://ru.api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=ru`
			);
			const response = await request.json();
			if (Number(response?.cod) >= 400) {
				throw new Error({ message: 'something go wrong', cod: response?.cod });
			}
			const result = {
				temp: Math.round(response?.main?.temp) + '°',
				description: response?.weather[0].description,
				timezone: response?.timezone || 10800,
			};

			return result;
		} catch (e) {
			console.log(e.message);
			return null;
		}
	}
	// ===========================================================================================
	static async getCityData(city) {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search.php?q=${city}&format=json&addressdetails=1&limit=1`
		);
		return await response.json();
	}
	// ===========================================================================================
	static async getWeatherData(lat, lon) {
		const response = await fetch(
			`https://ru.api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=ru`
		);
		return await response.json();
	}
	// ===========================================================================================
	static async getWeekWeatherData(lat, lon) {
		const response = await fetch(
			`https://ru.api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=ru`
		);
		return await response.json();
	}
}
