const formatTime = (ms, timezone = 0) => {
  const localDate = new Date();
  const localTimezone = localDate.getTimezoneOffset();

  const timestampDate = new Date(ms + timezone + localTimezone * 60000);
  const regionDate = new Date(Date.now() + timezone + localTimezone * 60000);

  const diff = timestampDate.getTime() - regionDate.getTime();
  const formattedDiff = new Date(Math.abs(diff) + localTimezone * 60000).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

  return {
    date: timestampDate.toLocaleDateString("ru-RU", { weekday: "long", day: "2-digit", month: "long" }),
    dateShort: timestampDate.toLocaleDateString("ru-RU", { weekday: "short", day: "2-digit", month: "short" }),
    time: timestampDate.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    diffDescription: `${diff > 0 ? "Осталось" : "Прошло"}: ${formattedDiff}`
  };
}

export default formatTime;