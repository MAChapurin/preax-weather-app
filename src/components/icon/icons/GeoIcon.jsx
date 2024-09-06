export const GeoIcon = ({ className, ...props }) => (
	<svg
		className={className}
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M21 10.0001C21 15.4912 15.4617 20.367 13.0742 22.2138C12.4356 22.7078 11.5644 22.7078 10.9258 22.2138C8.53825 20.367 3 15.4912 3 10.0001C3 7.6131 3.94821 5.32392 5.63604 3.63609C7.32387 1.94826 9.61305 1.00005 12 1.00005C14.3869 1.00005 16.6761 1.94826 18.364 3.63609C20.0518 5.32392 21 7.6131 21 10.0001Z'
			stroke='#545454'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z'
			stroke='#545454'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
