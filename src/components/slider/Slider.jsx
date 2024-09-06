import { useEffect, useRef, useState } from 'react';
import { Button } from '../button';
import { Icon } from '../icon/Icon';
import styles from './styles.module.css';
import useDebounce from '../../hooks/useDebounce';
import { Skeleton } from '../skeleton/Skeleton';

export const Slider = ({ data, vissible, loading }) => {
	const [index, setIndex] = useState(0);
	const [sizeContainer, setSizeContainer] = useState(0);
	const [finish, setFinish] = useState(false);
	const ref = useRef(null);

	const handleSetStep = (value) => {
		setIndex((prev) =>
			value < 0 && prev <= 0 ? 0 : value > 0 && finish ? prev : prev + value
		);
	};

	useEffect(() => {
		let newTransformValue = 0;
		let totalItemsWidth = 0;
		ref.current.childNodes.forEach((item, i) => {
			if (i < index) {
				newTransformValue += item.offsetWidth;
			}
			totalItemsWidth += item.offsetWidth;
		});

		const maxTransformValue = totalItemsWidth - ref.current.offsetWidth;
		if (newTransformValue > maxTransformValue) {
			newTransformValue = maxTransformValue;
			setFinish(true);
		} else {
			setFinish(false);
		}

		ref.current.style.transform = `translateX(-${newTransformValue}px)`;
	}, [data, index, sizeContainer]);

	const resize = useDebounce(() => {
		setSizeContainer(window.innerWidth);
	}, 100);

	useEffect(() => {
		window.addEventListener('resize', resize);
		return () => {
			window.removeEventListener('resize', resize);
		};
	}, [resize]);

	return (
		<div
			className={`${styles['statistic-slider']} ${
				vissible ? styles['active'] : ''
			}`}
		>
			<Button
				onClick={() => handleSetStep(-1)}
				className={styles['slide-btn']}
				disabled={index === 0}
			>
				<Icon name={'left'} />
			</Button>

			<div
				className={`
        ${styles['slider-wrapper']}
        ${index > 0 && styles.process} 
        ${finish && styles.finish}
        `}
			>
				<ul ref={ref} className={`${styles['slider']} list-reset`}>
					{!loading &&
						data.map((item, i) => {
							return (
								<li className={styles['statistic-list__item']} key={i}>
									<div className={styles.card}>
										<span className={styles['statistic-list__day']}>
											{item.time}
										</span>
										<img
											className={styles['statistic-list__icon']}
											src={`weather-icons/${item.icon}.svg`}
											alt='Иконка погоды'
										/>
										{item.temp && (
											<span className={styles['statistic-list__info']}>
												{item.temp}°
											</span>
										)}
										{item.minTemp && item.maxTemp && (
											<span
												className={`${styles['statistic-list__info']}`}
											>{`от ${item.minTemp}° до ${item.maxTemp}°`}</span>
										)}
									</div>
								</li>
							);
						})}
					{loading &&
						Array.from({ length: 6 }).map((_, i) => {
							return <Skeleton variant={'slide'} key={i} />;
						})}
				</ul>
			</div>
			<Button
				onClick={() => handleSetStep(1)}
				className={styles['slide-btn']}
				disabled={finish}
			>
				<Icon name={'right'} />
			</Button>
		</div>
	);
};
