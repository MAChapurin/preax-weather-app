import { useEffect, useState } from 'react';

export function useDebounceValue(value, delay = 1000) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const t = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(t);
		};
	}, [value, delay]);
	return debouncedValue;
}
