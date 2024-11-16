import { useEffect, useSyncExternalStore } from 'react';

const THEME_KEY = 'themeKey';

const initialState = localStorage.getItem(THEME_KEY)
	? JSON.parse(localStorage.getItem(THEME_KEY))
	: matchMedia('(prefers-color-scheme: dark)').matches;

let isDarkTheme = initialState;
const subscribers = new Set();

const callAllSubscribers = () => {
	subscribers.forEach((callback) => {
		callback();
	});
};

const themeStore = {
	getSnapshot() {
		return isDarkTheme;
	},

	subscribe(callback) {
		subscribers.add(callback);
		return () => subscribers.delete(callback);
	},

	setIsDarkTheme(booleanValue) {
		isDarkTheme = booleanValue;
		callAllSubscribers();
	},
};

export const useTheme = () => {
	const isDarkTheme = useSyncExternalStore(
		themeStore.subscribe,
		themeStore.getSnapshot
	);

	const { setIsDarkTheme } = themeStore;

	useEffect(() => {
		document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
		localStorage.setItem(THEME_KEY, isDarkTheme);
	}, [isDarkTheme]);

	return { isDarkTheme, setIsDarkTheme };
};
