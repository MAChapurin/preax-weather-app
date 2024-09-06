export const getCityName = (city) =>
	city.name ||
	city.address?.city ||
	city.address?.town ||
	city.address?.state ||
	city.address?.province ||
	city.display_name;
