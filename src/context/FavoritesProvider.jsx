import { useEffect, useState } from 'react';
import FavoritesContext from './favoritesContext';

export const FavoritesProvider = ({ children, ...props }) => {
	const STORAGE_KEY = 'favorites_key';
	const favoritesFromLocalStorage = localStorage.getItem(STORAGE_KEY);
	const initialState = favoritesFromLocalStorage
		? JSON.parse(favoritesFromLocalStorage)
		: [];
	const [favorites, setFavorites] = useState(initialState);

	const handlerLike = (item) => {
		if (favorites.length < 5) {
			setFavorites((prev) => [...prev, item]);
		}
	};

	const handlerDislike = (id) => {
		setFavorites((prev) => [...prev].filter((el) => el.osm_id !== id));
	};

	const isLiked = (id) => {
		const checkCB = (el) => el.osm_id === id;
		return favorites.some(checkCB);
	};

	useEffect(() => {
		// console.log('favorites => ', favorites);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
	}, [favorites]);

	return (
		<FavoritesContext.Provider
			value={{
				isLiked,
				favorites,
				handlerLike,
				handlerDislike,
			}}
			{...props}
		>
			{children}
		</FavoritesContext.Provider>
	);
};
