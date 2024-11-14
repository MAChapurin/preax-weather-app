import { Icon } from 'components';

import styles from './styles.module.css';

export const Logo = () => {
	return (
		<a href='/' className={styles.link}>
			<Icon className={styles.logo} name={'logo'} />
			<Icon className={styles.logoMini} name={'logoMini'} />
		</a>
	);
};
