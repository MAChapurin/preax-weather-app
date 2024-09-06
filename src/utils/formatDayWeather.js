import formatTime from "./formatTime";

const formatDayWeather = (data, timezone) => {
  return data.slice(0, 8).map(item => {
    return {
      time: formatTime(item.dt * 1000, (timezone || 10800) * 1000).time,
      icon: item.weather[0].icon,
      temp: item.main.temp.toFixed(),
      id: item.dt,
    }
  })
}

export default formatDayWeather;