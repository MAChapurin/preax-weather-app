import { useEffect } from 'react';
import { useBackground, useWeather } from 'hooks';
import { Footer, Header, Main } from 'components';
import { cn } from 'utils';

import styles from './styles.module.css';

export function App() {
	const { isDropdownOpen, cityCardData } = useWeather();
	const backgroundImage = useBackground(cityCardData.img?.alt);

	useEffect(() => {
		if (isDropdownOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'visible';
		}
		return () => {
			document.body.style.overflow = 'visible';
		};
	}, [isDropdownOpen]);

	useEffect(() => {
		document.addEventListener(
			'focus',
			(e) => {
				console.log(e.target);
			},
			[]
		);
	});

	return (
		<div
			className='app'
			style={{
				backgroundImage: `url("${backgroundImage}")`,
			}}
		>
			<div
				className={cn(styles.app__container, {
					[styles.blur]: !isDropdownOpen,
				})}
			>
				<Header />
				<Main />
				<Footer />
				<div
					className={cn(styles.blur__container, {
						[styles.open]: isDropdownOpen,
					})}
				></div>
			</div>
		</div>
	);
}
