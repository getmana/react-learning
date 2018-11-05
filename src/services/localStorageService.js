class localStorageService {
	static getLocalStorageItem(key) {
		return window.localStorage.getItem(key);
	}

	static setLocalStorageItem(key, value) {
		return window.localStorage.setItem(key, value);
	}

	static clearLocalStorage() {
		return window.localStorage.clear();
	}
}

export default localStorageService;