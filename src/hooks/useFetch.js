import { useState, useRef, useEffect } from 'react';

export function useFetch(url, options) {
	const [isLoading, setLoading] = useState(true);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const cache = useRef({});

	useEffect(() => {
		async function fetchData() {
			if (cache.current[url]) {
				const data = cache.current[url];
				setResponse(data);
			} else {
				try {
					setLoading(true);
					setError(null);
					const response = await fetch(url, options);
					const json = await response.json();
					if (response?.cod >= 400 || response?.code >= 400) {
						setError(response?.message);
						return false;
					} else {
						cache.current[url] = json;
						setResponse(json);
					}
				} catch (error) {
					setError(error);
				}
			}

			setLoading(false);
		}

		fetchData();
	}, [url, options]);

	return { isLoading, response, error };
}
