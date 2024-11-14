export function daysApiFilter(data) {
	const result = data.reduce((res, el) => {
		const dateKey = el.dt_txt.split(' ')[0];
		if (res[dateKey]) {
			res[dateKey].push(el);
		} else {
			res[dateKey] = [el];
		}
		return res;
	}, {});

	return Object.values(result);
}
