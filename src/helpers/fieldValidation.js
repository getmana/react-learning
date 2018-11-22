const required = value => (value || typeof value === 'number' ? undefined : 'Required!');

const emailValue = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Invalid email address'
		: undefined

const numberLength = (value = '') => (value.length < 7 ? 'Phone number is incorrect' : undefined);

const englishLetters = value =>
	value && !/^[a-zA-Z,\s]*$/.test(value)
		? 'English Letters Only!'
		: undefined

const imageLinks = value =>
	value && !/\.(jpe?g|png)$/i.test(value)
		? 'Please, use files with next extensions: .jpg, .jpeg, .png'
		: undefined

const positiveNumbers = value =>
	value && value <= 0
		? 'Use only positive numbers!'
		: undefined

const currentYear = (new Date()).getFullYear();

const lessThenCurrent = value =>
	value && value > currentYear
		? 'The year is uncorrect'
		: undefined

const wikiFormat = value =>
	value && value.indexOf('https://en.wikipedia.org/wiki/', 0) === -1
		? 'The link should contain the "https://en.wikipedia.org/wiki/"'
		: undefined

const isOneOf = list => value =>
	list.indexOf(value) === -1
		? 'Please, select value'
		: undefined

const onlyInteger = value =>
	value && !/^\d+$/.test(value)
		? 'Please, use only integer numbers'
		: undefined

const formatPhone = value => {
	if (!value) {
		return ''
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

const parsePhone = value => {
	return value ? value.replace( /-/g, '') : '';
}

export {
	required,
	emailValue,
	numberLength,
	formatPhone,
	parsePhone,
	englishLetters,
	imageLinks,
	positiveNumbers,
	lessThenCurrent,
	wikiFormat,
	isOneOf,
	onlyInteger
};