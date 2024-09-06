import { cn } from '../../utils/cn';
import styles from './styles.module.css';

export function ErrorWidget({
	cb,
	variant,
	bgLight = false,
	title = true,
	desc = true,
}) {
	const BIG = variant === 'big';
	const SMALL = variant === 'small';
	const MINI = variant === 'min';
	return (
		<div
			className={cn(styles.wrap, {
				[styles.big]: BIG,
				[styles.small]: SMALL,
				[styles.mini]: MINI,
				[styles.bg]: bgLight,
			})}
		>
			<h3
				className={cn(styles.title, {
					[styles.hidden]: !title,
					[styles.titleBigVariant]: BIG,
					[styles.titleMiniVariant]: MINI,
				})}
			>
				Упс! Произошла ошибка
			</h3>
			<p
				className={cn(styles.desc, {
					[styles.hidden]: !desc,
					[styles.descBigVariant]: BIG,
					[styles.descMiniVariant]: MINI,
				})}
			>
				Проверьте настройки и повторите попытку.
			</p>
			<button
				className={cn(styles.btn, {
					[styles.btnMiniVariant]: MINI,
				})}
				onClick={cb}
			>
				Повторить попытку
			</button>
		</div>
	);
}
