import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import { WeatherProvider } from './context/WeatherProvider';
import { App } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<WeatherProvider>
		<App />
	</WeatherProvider>
);
