import { useSyncExternalStore } from 'react';

export function useSyncLocalStorageSync(key, initialValue) {
	const getSnapshot = () => {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialValue;
	};

	function subscribe(callback) {
		function listener(event) {
			if (event.key === key) callback();
		}

		window.addEventListener('storage', listener);
		return () => window.removeEventListener('storage', listener);
	}

	const value = useSyncExternalStore(subscribe, getSnapshot);

	const setValue = (newValue) => {
		localStorage.setItem(key, JSON.stringify(newValue));
	};

	return [value, setValue];
}
