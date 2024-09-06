import styles from './styles.module.css';
import { Icon } from '../icon/Icon';

const Logo = () => {
	return (
		<a href='/' className={styles.link}>
			<Icon className={styles.logo} name={'logo'} />
			<Icon className={styles.logoMini} name={'logoMini'} />
		</a>
	);
};

export default Logo;
