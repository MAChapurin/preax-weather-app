import { useEffect, useState } from 'react';

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

export const useStore = (store, selector) => {
	const [value, setValue] = useState(selector(store.getState()));
	useEffect(() => {
		const listener = () => {
			setValue(selector(store.getState()));
		};
		return store.subscribe(listener);
	}, [store, selector]);
	return value;
};
