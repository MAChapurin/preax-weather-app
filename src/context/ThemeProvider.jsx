import { useEffect, useState } from 'react';
import ThemeContext from './ThemeContext';

export const ThemeProvider = ({ children, ...props }) => {
	const THEME_KEY = 'themeKey';

	const initialState = localStorage.getItem(THEME_KEY)
		? JSON.parse(localStorage.getItem(THEME_KEY))
		: matchMedia('(prefers-color-scheme: dark)').matches;

	const [isDarkTheme, setIsDarkTheme] = useState(initialState);

	useEffect(() => {
		document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
		localStorage.setItem(THEME_KEY, isDarkTheme);
	}, [isDarkTheme]);
	return (
		<ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }} {...props}>
			{children}
		</ThemeContext.Provider>
	);
};
