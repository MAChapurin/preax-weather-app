import { useEffect } from 'react';

import styles from './styles.module.css';
import { useSyncLocalStorageSync } from 'hooks';

const Footer = () => {
	const [value, setValue] = useSyncLocalStorageSync('test-key', 0);

	useEffect(() => {
		window.addEventListener('storage', (e) => {
			console.log(e);
		});
	}, []);
	return (
		<footer className={styles.footer}>
			Проект выполнен в рамках стажировки{' '}
			<a href='https://preax.ru' target='_blank' rel='noreferrer'>
				PREAX
			</a>
			<button
				onClick={() => {
					localStorage.setItem('test-key', value + 1);
				}}
			>
				+ 1
			</button>
			<div style={{ padding: '10px' }}>{value}</div>
		</footer>
	);
};

export default Footer;
