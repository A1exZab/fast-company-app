import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'

const commentsSlice = createSlice({
	name: 'comments',
	initialState: {
		entities: null,
		isLoading: true,
		error: null
	},
	reducers: {
		commentsRequested: (state) => {
			state.isLoading = true
		},
		commentsReceived: (state, action) => {
			state.entities = action.payload
			state.isLoading = false
		},
		commentsRequestFailed: (state, action) => {
			state.error = action.payload
			state.isLoading = false
		}
	}
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceived, commentsRequestFailed } = actions

function isOutdated(date) {
	if (Date.now() - date > 10 * 60 * 1000) {
		return true
	}

	return false
}

export const loadcommentsList = (userId) => async (dispatch) => {
	dispatch(commentsRequested())
	try {
		const { content } = await commentService.getComments()
		dispatch(commentsReceived(content))
	} catch (error) {
		dispatch(commentsRequestFailed(error.message))
	}
}

export const getcomments = () => (state) => state.comments.entities

export const getcommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer
