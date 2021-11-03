import { writable } from 'svelte/store';

function localstorageSynced(name: string, initialValue: any) {
	const { subscribe, set } = writable(initialValue);
    const localStorageExists = (typeof localStorage !== "undefined");
	if (localStorageExists) {
		if (localStorage.getItem(name) && localStorage.getItem(name) !== initialValue) {
            const lsValue = localStorage.getItem(name);
            if(typeof lsValue !== 'string') {
            set(JSON.parse(lsValue));
            } else {
                set(lsValue);
            }
		} else {
            set(initialValue)
			localStorage.setItem(name, JSON.stringify(initialValue));
		}
	}
	return {
		subscribe,
		set: (value) => {
			if (localStorage) {
				localStorage.setItem(name, value);
			}
			set(value);
		},
		invalidate: () => {
			localStorage.removeItem(name);
			set(initialValue);
		}
	};
}

export const loggedIn = writable(null);
export const user = localstorageSynced('user', '');
export const jwt = localstorageSynced('jwt', '');
