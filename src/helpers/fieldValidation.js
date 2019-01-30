const required = value => (value || typeof value === 'number' ? undefined : 'Required!');

const emailValue = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Invalid email address'
		: undefined

const numberLength = (value = '') => (value.length < 7 ? 'Phone number is incorrect' : undefined);

const sixteenDigits = value =>
	value && value.length !== 16
		? 'Card Number should be 16 digits length'
		: undefined

const threeDigits = value =>
	value && value.length !== 3
		? 'CVC should be 3 digits length'
		: undefined

const moreThanThreeLetters = value =>
	value && value.length <= 3
		? 'The length should be more than 3 letters'
		: undefined

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

const formatCVC = value => {
	if (!value) {
		return ''
	}

	const onlyNums = value.replace(/[^\d]/g, '')

	return `${onlyNums.slice(0, 3)}`
}

const parseCVC = value => {
	return value ? value.replace(/[^\d]/g, '').slice(0, 3) : '';
}

const formatCardNumber = value => {
	if (!value) {
		return ''
	}

	const onlyNums = value.replace(/[^\d]/g, '')

	if (onlyNums.length <= 4) {
		return onlyNums
	}

	if (onlyNums.length <= 8) {
		return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4)}`
	}

	if (onlyNums.length <= 12) {
		return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(8)}`
	}

	return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(8, 12)} ${onlyNums.slice(12, 16)}`
}

const parseCardNumber = value => {
	return value ? value.replace( / /g, '').replace(/[^\d]/g, '').slice(0, 16) : '';
}

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

	return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 5)}-${onlyNums.slice(5, 7)}`
}

const parsePhone = value => {
	return value ? value.replace( /-/g, '') : '';
}

const formatDate = value => {
	if (!value) {
		return ''
	}
	const onlyNums = value.replace(/[^\d]/g, '')

	if (onlyNums.length <= 2) {
		return onlyNums
	}

	return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}`
}

const parseDate = value => {
	return value ? value.slice(0, 5) : '';
}

const validDate = value =>
	value && +value.slice(0, 2) <= 31 && +value.slice(3, 5) <= 12
		? undefined
		: 'The date is incorrect'

const validate = values => {
	const errors = {}

	if (!values.cardNumber) {
		errors.cardNumber = 'Required'
	}
	else if (values.cardNumber.length < 16) {
		errors.cardNumber = 'Card Number should be 16 digits length'
	}

	if (!values.cardName) {
		errors.cardName = 'Required'
	}
	else if (!/^[a-zA-Z,\s]*$/.test(values.cardName)) {
		errors.cardName = 'English Letters Only!'
	}
	else if (values.cardName.length <= 3) {
		errors.cardName = 'The length should be more than 3 letters'
	}

	if (!values.cardDate) {
		errors.cardDate = 'Required'
	}
	else if (!(+values.cardDate.slice(0, 2) <= 31 && +values.cardDate.slice(0, 2) > 0
		&& +values.cardDate.slice(3, 5) <= 12 && +values.cardDate.slice(3, 5) > 0)) {
		errors.cardDate = 'The date is incorrect'
	}

	if (!values.cvc) {
		errors.cvc = 'Required'
	}
	else if (values.cvc.length < 3) {
		errors.cvc = 'CVC should be 3 digits length'
	}

	return errors
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
	onlyInteger,
	sixteenDigits,
	threeDigits,
	moreThanThreeLetters,
	formatDate,
	validDate,
	formatCardNumber,
	parseCardNumber,
	formatCVC,
	parseCVC,
	parseDate,
	validate
};