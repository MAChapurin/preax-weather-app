import formatTodayDetailsData from "../utils/formatTodayDetailsData";
import formatCityCardData from "../utils/formatCityCardData";

export const weatherIconsPath = "/weather-icons/";

export const cityCardMock = formatCityCardData();

export const weatherMock = formatTodayDetailsData();

export const statisticWeekData = [
  {
    time: 'Вс, 07 янв.',
    icon: '03d',
    minTemp: '-17',
    maxTemp: '-11',
  },
  {
    time: 'Пн, 08 янв.',
    icon: '03d',
    minTemp: '-16',
    maxTemp: '-8',
  },
  {
    time: 'Вт, 09 янв.',
    icon: '04d',
    minTemp: '-8',
    maxTemp: '-2',
  },
  {
    time: 'Ср, 10 янв.',
    icon: '04d',
    minTemp: '-8',
    maxTemp: '-2',
  },
  {
    time: 'Ср, 10 янв.',
    icon: '04d',
    minTemp: '-8',
    maxTemp: '-2',
  },

];

export const statisticDayData = [
  {
    time: '12:00',
    icon: '04d',
    temp: '-7',
    id: 1
  },
  {
    time: '15:00',
    icon: '04d',
    temp: '-5',
    id: 2
  },
  {
    time: '18:00',
    icon: '04d',
    temp: '-7',
    id: 3
  },
  {
    time: '21:00',
    icon: '04n',
    temp: '-9',
    id: 4
  },
  {
    time: '00:00',
    icon: '04n',
    temp: '-11',
    id: 5
  },
  {
    time: '03:00',
    icon: '04n',
    temp: '-13',
    id: 6
  },
  {
    time: '03:00',
    icon: '04n',
    temp: '-13',
    id: 7
  },
  {
    time: '03:00',
    icon: '04n',
    temp: '-13',
    id: 8
  },

];