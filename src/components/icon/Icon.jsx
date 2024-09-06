import React from 'react';
import {
	SearchIcon,
	RightArrowIcon,
	LeftArrowIcon,
	ClearIcon,
	DeleteIcon,
	LikeIcon,
	SunIcon,
	MoonIcon,
	LogoIcon,
	LogoMiniIcon,
	HumidityIcon,
	HumidityDarkIcon,
	PressureIcon,
	VisibilityIcon,
	SunriseIcon,
	SunsetIcon,
	WindIcon,
	GeoIcon,
} from './icons';

export const Icon = ({ className, name, ...props }) => {
	const config = {
		search: <SearchIcon className={className} {...props} />,
		clear: <ClearIcon className={className} {...props} />,
		right: <RightArrowIcon className={className} {...props} />,
		left: <LeftArrowIcon className={className} {...props} />,
		delete: <DeleteIcon className={className} {...props} />,
		like: <LikeIcon className={className} {...props} />,
		sun: <SunIcon className={className} {...props} />,
		moon: <MoonIcon className={className} {...props} />,
		logo: <LogoIcon className={className} {...props} />,
		logoMini: <LogoMiniIcon className={className} {...props} />,
		humidity: <HumidityIcon className={className} {...props} />,
		humiditydark: <HumidityDarkIcon className={className} {...props} />,
		barometr: <PressureIcon className={className} {...props} />,
		visibility: <VisibilityIcon className={className} {...props} />,
		sunrise: <SunriseIcon className={className} {...props} />,
		sunset: <SunsetIcon className={className} {...props} />,
		direction: <WindIcon className={className} {...props} />,
		geolocation: <GeoIcon className={className} {...props} />,
	};

	return config[name];
};
