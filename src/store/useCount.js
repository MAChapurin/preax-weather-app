import { useSyncExternalStore } from 'react';
import countStore from './countStore';

export function useCount() {
	const count = useSyncExternalStore(countStore.subscribe, countStore.read);
	const increment = countStore.increment;
	const decrement = countStore.decrement;
	return { count, increment, decrement };
}
