const formRatingsArray = (ratings) => {
	let resultRatings = [];
	ratings.forEach((rating) => {
		resultRatings.push(rating.value)
	})

	return resultRatings;
}

export default formRatingsArray;