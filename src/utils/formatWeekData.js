import daysApiFilter from "./daysApiFilter";
import formatTime from "./formatTime";

const formatWeekData = (data, timezone) => {
  return daysApiFilter(data).map(item => {
    const maxTempOfDay = item.sort((a, b) => a.main.temp_max - b.main.temp_max)[item.length - 1];
    const minTempOfDay = item.sort((a, b) => a.main.temp_min - b.main.temp_min)[0];
    return {
      icon: maxTempOfDay.weather[0].icon,
      minTemp: minTempOfDay.main.temp_min.toFixed(),
      maxTemp: maxTempOfDay.main.temp_max.toFixed(),
      time: formatTime(maxTempOfDay.dt * 1000, (timezone || 10800) * 1000).dateShort,
      id: maxTempOfDay.dt
    }
  })
}

export default formatWeekData;