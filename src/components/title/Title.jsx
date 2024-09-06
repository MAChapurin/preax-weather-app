import styles from './styles.module.css';

export const Title = ({ text }) => {
	return <h3 className={styles.title}>{text}</h3>;
};
