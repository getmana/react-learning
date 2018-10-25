const required = value => (value || typeof value === 'number' ? undefined : 'Required!');

const emailValue = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Invalid email address'
		: undefined

const numberLength = (value = '') => (value.length < 9 ? 'Phone number is incorrect' : undefined);

const normalizePhone = value => {
	if (!value) {
		return value
	}

	const onlyNums = value.replace(/[^\d]/g, '')

	if (onlyNums.length <= 3) {
		return onlyNums
	}

	if (onlyNums.length <= 5) {
		return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
	}

	return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 5)}-${onlyNums.slice(
		5,
		7
	)}`
}

export {
	required,
	emailValue,
	numberLength,
	normalizePhone
};