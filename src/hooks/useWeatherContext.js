import { useContext } from 'react';
import WeatherContext from '../context/weatherContext';

export const useWeather = () => useContext(WeatherContext);
