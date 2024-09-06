import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import { WeatherProvider } from './context/WeatherProvider';
import { FavoritesProvider } from './context/FavoritesProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { App } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ThemeProvider>
		<WeatherProvider>
			<FavoritesProvider>
				<App />
			</FavoritesProvider>
		</WeatherProvider>
	</ThemeProvider>
);
