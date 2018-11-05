import { types, } from './index'

export const changePageNumber = (pageNumber) => ({
	type: types.CHANGE_PAGE_NUMBER,
	payload: {
		pageNumber,
	},
})

export const sortItems = (isSorted) => ({
	type: types.SORT_ITEMS,
	payload: {
		isSorted,
		pageNumber: 1,
	},
})

export const savePages = pages => ({
	type: types.SAVE_PAGES,
	payload: {
		pages,
		numberOfPages: pages.length,
	},
})

export const clearTableParams = () => ({
	type: types.CLEAR_TABLE_PARAMS,
	payload: {
		pageNumber: 1,
		isSorted: false,
		pages: [],
		numberOfPages: 0,
	},
})