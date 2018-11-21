class FormRatingsArray {
	static formArray(ratings) {
		let resultRatings = [];
		ratings.forEach((rating) => {
			resultRatings.push(rating.value)
		})

		return resultRatings;
	}
}

export default FormRatingsArray;