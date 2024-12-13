export const saveMapToLocalStorage = (map, key) => {
	const mapArray = Array.from(map);
	const jsonString = JSON.stringify(mapArray);
	localStorage.setItem(key, jsonString);
};

export const loadMapFromLocalStorage = (key) => {
	const jsonString = localStorage.getItem(key);
	if (!jsonString) {
		return new Map();
	}
	const mapArray = JSON.parse(jsonString);
	return new Map(mapArray);
};
