import TodosApp from 'store/todosApp';
import styles from './styles.module.css';
import { useSyncExternalStore } from 'react';
import countStore from 'store/countStore';
import { useCount } from 'store/useCount';

export const Footer = () => {
	const { count, increment, decrement } = useCount();
	return (
		<>
			<div className='App'>
				count: {count}
				<div>
					<button onClick={increment}>Increment</button>
					<button onClick={decrement}>Decrement</button>
				</div>
			</div>
			<footer className={styles.footer}>
				Проект выполнен в рамках стажировки{' '}
				<a href='https://preax.ru' target='_blank' rel='noreferrer'>
					PREAX
				</a>
			</footer>
		</>
	);
};
