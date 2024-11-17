import { useEffect, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'favorites_key';
const favoritesFromLocalStorage = localStorage.getItem(STORAGE_KEY);
const initialState = favoritesFromLocalStorage
	? JSON.parse(favoritesFromLocalStorage)
	: [];
let favorites = initialState;
const subscribers = new Set();

const emitChange = () => {
	subscribers.forEach((callback) => {
		callback();
	});
};

const favoritesStore = {
	getSnapshot: () => favorites,

	subscribe(callback) {
		subscribers.add(callback);
		return () => subscribers.delete(callback);
	},

	handlerLike(item) {
		if (favorites.length < 5) {
			favorites = [...favorites, item];
			emitChange();
		}
	},

	handlerDislike(id) {
		favorites = favorites.filter((el) => el.osm_id !== id);
		emitChange();
	},

	isLiked(id) {
		const checkCB = (el) => el.osm_id === id;
		return favorites.some(checkCB);
	},
};

export const useFavorites = () => {
	const favorites = useSyncExternalStore(
		favoritesStore.subscribe,
		favoritesStore.getSnapshot
	);

	const { handlerLike, handlerDislike, isLiked } = favoritesStore;

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
	}, [favorites]);

	return {
		isLiked,
		favorites,
		handlerLike,
		handlerDislike,
	};
};
