import { useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';

export const useHook = (key, initialValue) => {
    const [value, setValue] = useLocalStorage(key, initialValue);

    const toggleMode = (e) => {
        e.preventDefault();
        setValue(!value);
    };

    useEffect(() => {
        if (value == true) {

        } else
    }, [value]);
    console.log([value, setValue, toggleMode]);
    return [value, setValue, toggleMode];
};
