import styles from './styles.module.css';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			Проект выполнен в рамках стажировки{' '}
			<a href='https://preax.ru' target='_blank' rel='noreferrer'>
				PREAX
			</a>
		</footer>
	);
};
