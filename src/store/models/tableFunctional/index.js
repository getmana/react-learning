export const initialState = {
	pageNumber: 1,
	isSorted: false,
	pages: [],
	numberOfPages: 0,
}

export const types = {
	CHANGE_PAGE_NUMBER: 'CHANGE_PAGE_NUMBER',
	SORT_ITEMS: 'SORT_ITEMS',
	SAVE_PAGES: 'SAVE_PAGES',
	CLEAR_TABLE_PARAMS: 'CLEAR_TABLE_PARAMS',
}

export * from './actions'

export default (state = initialState, action) => action.type in types ? { ...state, ...action.payload, } : state