import { useSyncExternalStore } from 'react';

export const createStore = (initialState) => {
	let state = initialState;
	let listeners = new Set();
	return {
		subscribe: (cb) => {
			listeners.add(cb);
			return () => {
				listeners.delete(cb);
			};
		},
		getState: () => state,
		setState: (newState) => {
			state = newState;
			listeners.forEach((listener) => listener());
		},
	};
};

export function useStore(store) {
	const value = useSyncExternalStore(store.subscribe, store.getState);

	const setValue = (action) => {
		store.setState(action(store.getState()));
	};

	return [value, setValue];
}
