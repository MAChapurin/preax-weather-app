import { useEffect } from 'react';

export const useClickOutside = (ref, callback, isActive) => {
  const handleClickOutside = (event) => {
    if (!isActive) return;
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};
