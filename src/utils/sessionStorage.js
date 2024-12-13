export const saveMapToSessionStorage = (map, key) => {
	const mapArray = Array.from(map);
	const jsonString = JSON.stringify(mapArray);
	sessionStorage.setItem(key, jsonString);
};

export const loadMapFromSessionStorage = (key) => {
	const jsonString = sessionStorage.getItem(key);
	if (!jsonString) {
		return new Map();
	}
	const mapArray = JSON.parse(jsonString);
	return new Map(mapArray);
};
